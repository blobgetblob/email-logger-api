import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class GatekeeperMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		if (req.headers.authorization) {
			const bearer = req.headers.authorization.split(' ')
			if (bearer.length == 2) {
				const token = bearer[1]
				try {
					const decoded = jwt.verify(token, process.env.JWT_KEY)
					if (decoded.identity.EMPLOYEEID) {
						res.locals.identity = decoded.identity
						res.locals.token = token
						next()
					} else {
						throw new HttpException('Unknown EMPLOYEEID', HttpStatus.FORBIDDEN)
					}
				} catch (_) {
					throw new HttpException('Your token was invalid', HttpStatus.FORBIDDEN)
				}
			} else {
				throw new HttpException('Your token was malformed', HttpStatus.FORBIDDEN)
			}
		} else {
			throw new HttpException('You need authorization bearer header', HttpStatus.FORBIDDEN)
		}
	}
}
