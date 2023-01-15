import { Module } from '@nestjs/common';
import * as Joi from 'joi'; 
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { AuthModule, DatabaseModule, RabbitMQModule } from '@app/common';
import { OrdersRepository } from './orders.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { BILLING_SERVICE } from './constants/services';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      DB_URI: Joi.string().required(),
      APP_PORT: Joi.number().required()
  }),//make sure certain env variables are instantiated
    envFilePath: './apps/orders/.env'
  }), 
  DatabaseModule,
  MongooseModule.forFeature([{name: Order.name ,schema: OrderSchema}]),
  RabbitMQModule.register({
    name: BILLING_SERVICE
  }),
  AuthModule
],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
