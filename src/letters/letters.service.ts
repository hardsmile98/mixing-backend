import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckLetterDto, GetLetterQueryDto } from './dto';
import { BitcoinService } from 'src/bitcoin/bitcoin.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LettersService {
  constructor(
    private bitcoinService: BitcoinService,
    private prismaService: PrismaService,
  ) {}

  getAddressesForMessage(
    addresses: Array<Prisma.$RecipientAddressesPayload['scalars']>,
  ) {
    return addresses
      .map((item) => `${item.percent}% to ${item.address} after ${item.delay}h`)
      .join(', ');
  }

  async getLetter(query: GetLetterQueryDto) {
    const order = await this.prismaService.order.findUnique({
      where: { uuid: query.uuid },
      include: {
        recipientAddresses: true,
      },
    });

    if (!order) {
      throw new BadRequestException('Letter is not found');
    }

    const message = `We confirm that we have generated the address ${
      order.transferAddress
    } in order to transfer incoming amount (minus fee) to the following addresses: ${this.getAddressesForMessage(
      order.recipientAddresses,
    )}. This email is digitally signed by our main account, please do not share it with others. Thank you for using our service`;

    const { signature, letterAddress } = await this.bitcoinService.signMessage(
      message,
    );

    const file = `
===== START HEAD =====
Date: ${new Date().toISOString()}
===== END HEAD =====

===== START SIGNING BITCOIN ADDRESS =====
${letterAddress}
===== END SIGNING BITCOIN ADDRESS =====
    
===== START MESSAGE =====
${message}
===== END MESSAGE =====
    
===== START SIGNATURE =====
${signature}
===== END SIGNATURE =====
`;

    return file;
  }

  async checkLetter(dto: CheckLetterDto) {
    const { message, signature } = dto;

    const isVeified = await this.bitcoinService.verifyMessage(
      message,
      signature,
    );

    return {
      isVeified,
      success: true,
    };
  }
}
