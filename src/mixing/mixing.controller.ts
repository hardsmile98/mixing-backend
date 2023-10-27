import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MixingService } from './mixing.service';
import { CreateOrderDto, OrderQueryDto } from './dto';

@Controller('mixing')
export class MixingController {
  constructor(private mixingService: MixingService) {}

  @Post('/')
  createOrder(@Body() dto: CreateOrderDto) {
    return this.mixingService.createOrder(dto);
  }

  @Get('/')
  getOrder(@Query() query: OrderQueryDto) {
    return this.mixingService.getOrder(query);
  }

  @Get('/check')
  checkOrder(@Query() query: OrderQueryDto) {
    return this.mixingService.checkOrder(query);
  }
}
