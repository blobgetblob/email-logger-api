import { Controller, Get, Res } from '@nestjs/common'

@Controller('auth')
export class AuthController {
	@Get('/')
	getHello(@Res({ passthrough: true }) res: any) {
		return { ...res.locals.identity }
	}
}
