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

	@Get('/public/:hash/')
	async findAllPublic(@Res({ passthrough: true }) res: any, @Param('hash') hash: string) {
		const unhash = atob(hash)
		return this.assetsService.findAll({ EMPLOYEEID: unhash })
	}

	@Get(':id/')
	async findOne(@Res({ passthrough: true }) res: any, @Param('id') id: string) {
		return this.assetsService.findOne(res.locals.identity, id)
	}

	@Get('/public/:hash/:id/')
	async findOnePublic(@Res({ passthrough: true }) res: any, @Param('hash') hash: string, @Param('id') id: string) {
		const unhash = atob(hash)
		return this.assetsService.findOne({ EMPLOYEEID: unhash }, id)
	}

	@Patch(':id/')
	async patchOne(@Res({ passthrough: true }) res: any, @Param('id') id: string, @Body('size_value') size_value: string) {
		return this.assetsService.patchOne(res.locals.identity, id, size_value)
	}

	@Patch('/public/:hash/:id/')
	async patchOnePublic(
		@Res({ passthrough: true }) res: any,
		@Param('hash') hash: string,
		@Param('id') id: string,
		@Body('size_value') size_value: string,
	) {
		const unhash = atob(hash)
		return this.assetsService.findOne({ EMPLOYEEID: unhash }, id)
	}
}
