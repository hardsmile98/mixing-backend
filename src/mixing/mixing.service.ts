import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto';

@Injectable()
export class MixingService {
  async createOrder(dto: CreateOrderDto) {
    return {};
  }

  async getOrder(dto: CreateOrderDto) {
    return {};
  }

  async checkOrder(dto: CreateOrderDto) {
    return {};
  }
}
