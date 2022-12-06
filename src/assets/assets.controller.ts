import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common'
import { AssetsService } from './assets.service'

@Controller('assets')
export class AssetsController {
	constructor(private readonly assetsService: AssetsService) {}

	@Get('/')
	async findAll(@Res({ passthrough: true }) res: any) {
		return this.assetsService.findAll(res.locals.identity)
	}

	@Get('/not_filled/')
	async findAllNotFilled(@Res({ passthrough: true }) res: any) {
		return this.assetsService.findAll(res.locals.identity, true)
	}

	@Get(':id/')
	async findOne(@Res({ passthrough: true }) res: any, @Param('id') id: string) {
		return this.assetsService.findOne(res.locals.identity, id)
	}

	@Patch(':id/')
	async patchOne(@Res({ passthrough: true }) res: any, @Param('id') id: string, @Body('size_value') size_value: string) {
		return this.assetsService.patchOne(res.locals.identity, id, size_value)
	}
}
