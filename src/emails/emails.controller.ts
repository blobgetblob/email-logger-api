import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { EmailsService } from './emails.service'

@Controller('emails')
export class EmailsController {
	constructor(private readonly emailsService: EmailsService) {}

	@Get('/')
	async findAll(@Res({ passthrough: true }) res: any) {
		return this.emailsService.findAll(res.locals.identity)
	}
}
