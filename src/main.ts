import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule, { cors: true });

  const ampqApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.AMQP_URL],
        queue: process.env.EMPLOYEE_LOAN_QUEUE_NAME,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

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
