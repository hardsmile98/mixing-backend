import { Injectable } from '@nestjs/common';
import { CheckLetterDto, GetLetterQueryDto } from './dto';
import { BitcoinService } from 'src/bitcoin/bitcoin.service';

@Injectable()
export class LettersService {
  constructor(private bitcoinService: BitcoinService) {}

  async getLetter(query: GetLetterQueryDto) {
    return this.bitcoinService.signMessage('message');
  }

  async checkLetter(dto: CheckLetterDto) {
    return {};
  }
}
