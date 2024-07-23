import { Body, Controller, Get, Param, Patch, Post, Query, Res } from '@nestjs/common'
import { EmailsService } from './emails.service'
import { EmailFilterQueryDto } from './dtos/email-filter-query.dto'

@Controller('emails')
export class EmailsController {
	constructor(private readonly emailsService: EmailsService) {}

	@Get('/')
	async findAll(@Res({ passthrough: true }) res: any, @Query() dto: EmailFilterQueryDto) {
		return this.emailsService.findAll(res.locals.identity, dto)
	}

	@Get('/')
	async deleteAll(@Res({ passthrough: true }) res: any, @Query() dto: EmailFilterQueryDto) {
		return this.emailsService.deleteAll(res.locals.identity, dto)
	}

	@Get('/logger/')
	async logger(@Res({ passthrough: true }) res: any) {
		return this.emailsService.logger(res.locals.identity)
	}
}
