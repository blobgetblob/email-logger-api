import { Injectable, Res } from '@nestjs/common'
import axios from 'axios'
import { URLSearchParams } from 'url'

@Injectable()
export class DemplonService {
	async getSelfDetail(identity: any, token: string) {
		const res = await axios.get(process.env.DEMPLON_API + 'details_minimalist/' + identity.EMPLOYEEID + '/', {
			headers: { Authorization: 'Bearer ' + token },
		})
		if (res && res.data && res.data.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
			return res.data.data[0]
		} else {
			return null
		}
	}

	async miscAnnouncementSeen(announcement_id: string, employee_id: string) {
		const res = await axios.post(
			process.env.DEMPLON_API + 'misc/announcements/seen/',
			new URLSearchParams({
				id_announcement: announcement_id,
				id_target: employee_id,
			}),
		)
		if (res && res.data && res.data.success) {
			return res.data
		} else {
			return null
		}
	}
}
