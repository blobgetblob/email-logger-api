import { Injectable } from '@nestjs/common'
import * as dateFns from 'date-fns'

@Injectable()
export class AppService {
	getHello() {
		return { identifier: 'EMPA API', datetime: dateFns.format(new Date(), 'yyyy-MM-dd HH:mm:ss') }
	}
}
