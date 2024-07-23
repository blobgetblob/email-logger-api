import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Email } from './entities/email.entity'
import { ImapFlow } from 'imapflow'
import { simpleParser } from 'mailparser'
@Injectable()
export class EmailsService {
	constructor(
		@InjectRepository(Email)
		private readonly emailRepostiory: Repository<Email>,
	) {}

	async concat(stream) {
		return new Promise((res, rej) => {
			var buffers = []
			stream.on('data', function (data) {
				buffers.push(data)
			})
			stream.on('end', function () {
				res(Buffer.concat(buffers))
			})
		})
	}

	async findAll(identity: any) {
		const client = new ImapFlow({
			host: 'mail.fastpanel.website',
			port: 993,
			secure: true,
			auth: {
				user: 'master@fastpanel.website',
				pass: 'k0_{qm8ufPHI',
			},
		})
		await client.connect()
		const messages = []
		const fullMessages = []
		const lock = await client.getMailboxLock('INBOX')
		try {
			for await (const message of client.fetch(
				{
					seen: false,
				},
				{ uid: true, envelope: true, bodyParts: true, bodyStructure: true },
			)) {
				messages.push(message)
			}
		} finally {
			lock.release()
		}
		for (let message of messages) {
			const subject = message?.envelope?.subject ?? ''
			const from = message?.envelope?.from?.[0]?.address ?? ''
			const to = message?.envelope?.to?.[0]?.address ?? ''
			if (from && to && subject.match(/made it easy to get back on/i)) {
				let { content } = await client.download(message.seq)
				const buf = await this.concat(content)
				const parser = await simpleParser(buf)
				const contentString = parser?.html ? parser.html.replace(/&amp;/g, '&') : ''
				const links = []
				contentString
					?.match(
						/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gi,
					)
					?.forEach(function (item) {
						if (links.indexOf(item) < 0) {
							links.push(item)
						}
					})
				await client.messageFlagsAdd(message.seq, ['\\Seen'])

				for (let link of links) {
					const topush: any = { email: to, from, link, created_at: new Date(), updated_at: new Date() }
					if (link.match(/_n\/emaillogin/i)) {
						topush.type = 'ig_login_by_email'
					} else if (link.match(/password\/reset/i)) {
						topush.type = 'ig_password_by_email'
					}
					if (topush?.type) {
						const create = this.emailRepostiory.create(topush)
						await this.emailRepostiory.save(create)
						fullMessages.push(topush)
					}
				}
			}
		}
		await client.logout()
		return fullMessages
	}

	async findOne(identity: any, id: string) {
		return []
	}
}
