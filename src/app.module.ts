import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthController } from './auth/auth.controller'
import { GatekeeperMiddleware } from './common/middlewares/gatekeeper.middleware'
import { DocumentsController } from './documents/documents.controller'
import { DocumentsModule } from './documents/documents.module'

@Module({
	imports: [
		ScheduleModule.forRoot(),
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: process.env.DATABASE_EMPA_HOST,
			port: parseInt(process.env.DATABASE_EMPA_PORT),
			username: process.env.DATABASE_EMPA_USER,
			password: process.env.DATABASE_EMPA_PASSWORD,
			database: process.env.DATABASE_EMPA_NAME,
			synchronize: false,
			autoLoadEntities: true,
		}),
		DocumentsModule,
	],
	controllers: [AppController, AuthController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(GatekeeperMiddleware).forRoutes(AuthController, DocumentsController)
	}
}
