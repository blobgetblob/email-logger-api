import { Injectable } from '@nestjs/common'
import * as dateFns from 'date-fns'

@Injectable()
export class AppService {
	async getHello() {
		return { identifier: process.env.APP_NAME, datetime: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss') }
	}
}
