import { Body, Controller, Get, Post } from '@nestjs/common';
import { MixingService } from './mixing.service';
import { CreateOrderDto } from './dto';

@Controller('mixing')
export class MixingController {
  constructor(private mixingService: MixingService) {}

  @Post('/')
  createOrder(@Body() dto: CreateOrderDto) {
    return this.mixingService.createOrder(dto);
  }

  @Get('/:id')
  getOrder(@Body() dto: CreateOrderDto) {
    return this.mixingService.getOrder(dto);
  }

  @Get('/check/:id')
  checkOrder(@Body() dto: CreateOrderDto) {
    return this.mixingService.checkOrder(dto);
  }
}
