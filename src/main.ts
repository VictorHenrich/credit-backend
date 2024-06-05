import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule, { cors: true });

  const ampqApp =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Credit API')
    .setDescription('This is an API developed for the selection process stage')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(httpApp, config);

  SwaggerModule.setup('api', httpApp, document);

  await Promise.all([httpApp.listen(process.env.API_PORT), ampqApp.listen()]);
}
bootstrap();
