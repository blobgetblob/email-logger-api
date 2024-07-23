import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Email } from './entities/email.entity'

@Injectable()
export class EmailsService {
	constructor(
		@InjectRepository(Email)
		private readonly emailRepostiory: Repository<Email>,
	) {}

	async findAll(identity: any) {
		return []
	}

	async findOne(identity: any, id: string) {
		return []
	}
}
