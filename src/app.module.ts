import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { GatekeeperMiddleware } from './common/middlewares/gatekeeper.middleware'
import { EmailsModule } from './emails/emails.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DATABASE_EMLOG_HOST,
			port: process.env.DATABASE_EMLOG_PORT ? +process.env.DATABASE_EMLOG_PORT : null,
			username: process.env.DATABASE_EMLOG_USER,
			password: process.env.DATABASE_EMLOG_PASSWORD,
			database: process.env.DATABASE_EMLOG_NAME,
			extra: process.env.DATABASE_EMLOG_SOCKET
				? {
						socketPath: process.env.DATABASE_EMLOG_SOCKET,
				  }
				: {},
			synchronize: false,
			autoLoadEntities: true,
		}),
		EmailsModule,
	],
	controllers: [AppController, AuthController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(GatekeeperMiddleware).exclude('(.*)/public/(.*)', '/').forRoutes('*')
	}
}
