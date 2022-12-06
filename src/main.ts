import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import 'dotenv/config'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	)

	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

	app.use(helmet())

	const options = new DocumentBuilder()
		.setTitle(process.env.APP_NAME)
		.setDescription(process.env.APP_DESCRIPTION)
		.setVersion(process.env.APP_VERSION)
		.build()

	const document = SwaggerModule.createDocument(app, options)

	SwaggerModule.setup('api', app, document)

	app.enableCors()

	await app.listen(4000)
}
bootstrap()
