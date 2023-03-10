import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { AUTH_SERVICE } from './services';

@Module({
  imports: [RabbitMQModule.register({ name: AUTH_SERVICE })],
  exports: [RabbitMQModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*'); //extracting cookies from every route
  }
}