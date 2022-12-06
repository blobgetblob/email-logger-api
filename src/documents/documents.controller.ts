import { Controller, Get, Param, Res } from '@nestjs/common'
import { DocumentsService } from './documents.service'

@Controller('documents')
export class DocumentsController {
	constructor(private readonly serviceService: DocumentsService) {}

	@Get('/')
	findAll(@Res({ passthrough: true }) res: any) {
		return this.serviceService.findAll(res.locals.identity, res.locals.token)
	}
}
