import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateOrderDto, OrderQueryDto } from './dto';
import { BitcoinService } from 'src/bitcoin/bitcoin.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MixingService {
  constructor(
    private bitcoinService: BitcoinService,
    private prismaService: PrismaService,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    try {
      const orderUuid = uuid();

      const transferAddress = await this.bitcoinService.getMainWalletNewAddress(
        orderUuid,
      );

      if (!transferAddress) {
        throw new BadRequestException('Failed to create transfer addresses');
      }

      const order = {
        uuid: orderUuid,
        mixCode: dto.mixCode ? dto.mixCode : uuid(),
        feePercent: dto.feePercent,
        transferAddress,
      };

      await this.prismaService.order.create({
        data: {
          ...order,
          recipientAddresses: {
            createMany: {
              data: dto.addresses,
            },
          },
        },
      });

      return {
        order,
        success: true,
      };
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }

  async getOrder(query: OrderQueryDto) {
    return {};
  }

  async checkOrder(query: OrderQueryDto) {
    return {};
  }
}
