import { NestFactory } from '@nestjs/core';
import { RabbitMQService } from '@app/common';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rmqService = app.get(RabbitMQService);
  app.connectMicroservice(rmqService.getOptions('BILLING'));
  await app.startAllMicroservices();
}
bootstrap();