import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { useContainer } from 'class-validator'
import { ValidationContextInterceptor } from './interceptors/validation-context.interceptor'
import { ValidationError, ValidationPipe } from '@nestjs/common'
import { ValidationException } from './share/exceptions/validation.exception'
import { StripValidationContextPipe } from './pipes/strip-validation-context.pipe'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.enableCors()
  app.useGlobalInterceptors(new ValidationContextInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false,
        value: false
      },
      exceptionFactory: (errors: ValidationError[]) => {
        throw new ValidationException(errors)
      }
    }),
    new StripValidationContextPipe()
  )
  const options = new DocumentBuilder()
    .setTitle('Z2 Hrm Bot NestJS')
    .setDescription('The Z2 Hrm Bot NestJS API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
  const configService = app.get(ConfigService)
  await app.listen(configService.get('app.port'))
}

bootstrap()
