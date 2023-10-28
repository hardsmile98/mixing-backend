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

      const createdOrder = await this.prismaService.order.create({
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
        order: {
          ...order,
          recipientAddresses: dto.addresses,
          status: createdOrder.status,
        },
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
    try {
      const order = await this.prismaService.order.findUnique({
        where: { uuid: query.uuid },
        include: {
          recipientAddresses: true,
        },
      });

      return {
        order: {
          uuid: order.uuid,
          mixCode: order.mixCode,
          feePercent: order.feePercent,
          transferAddress: order.transferAddress,
          recipientAddresses: order.recipientAddresses,
          status: order.status,
        },
        success: true,
      };
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }

  async checkOrder(query: OrderQueryDto) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { uuid: query.uuid },
        include: {
          recipientAddresses: true,
        },
      });

      return {
        status: order.status,
        success: true,
      };
    } catch (e) {
      return {
        message: e,
        success: false,
      };
    }
  }
}
