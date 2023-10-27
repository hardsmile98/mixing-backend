import { Injectable } from '@nestjs/common';
import { CreateOrderDto, OrderQueryDto } from './dto';
import { BitcoinService } from 'src/bitcoin/bitcoin.service';

@Injectable()
export class MixingService {
  constructor(private bitcoinService: BitcoinService) {}

  async createOrder(dto: CreateOrderDto) {
    return {};
  }

  async getOrder(query: OrderQueryDto) {
    return {};
  }

  async checkOrder(query: OrderQueryDto) {
    return {};
  }
}
