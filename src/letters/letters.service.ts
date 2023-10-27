import { Injectable } from '@nestjs/common';
import { CheckLetterDto, GetLetterQueryDto } from './dto';
import { BitcoinService } from 'src/bitcoin/bitcoin.service';

@Injectable()
export class LettersService {
  constructor(private bitcoinService: BitcoinService) {}

  async getLetter(query: GetLetterQueryDto) {
    // get order data
    const addresses = [
      {
        address: 'uerjwenrwjeriwerrwjerniwerijew',
        percent: 100,
      },
    ];

    const mixCode = '1ewH3gr';

    const message = `message`;

    const signature = await this.bitcoinService.signMessage(message);

    const file = `
===== HEAD =====
Date: ${new Date().toISOString()}
===== HEAD =====
    
=====MESSAGE =====
${message}
===== MESSAGE =====
    
===== SIGNATURE =====
${signature}
===== SIGNATURE =====
`;

    return file;
  }

  async checkLetter(dto: CheckLetterDto) {
    const { message, signature } = dto;

    return await this.bitcoinService.verifyMessage(message, signature);
  }
}
