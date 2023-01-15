import { JwtAuthGuard, RabbitMQService } from '@app/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { EventPattern, Payload, RmqContext, Ctx } from '@nestjs/microservices';
import { BillingService } from './billing.service';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService, private readonly rabbitMQService: RabbitMQService) {}

  @Get()
  getHello(): string {
    return this.billingService.getHello();
  }

  @EventPattern('order_created')
  @UseGuards(JwtAuthGuard)
  async handleOrderCreated(@Payload() data:any, @Ctx() context:RmqContext){
      this.billingService.bill(data);
      this.rabbitMQService.ack(context); //we need to manually acknowledge that the msg is sent
  }
}
