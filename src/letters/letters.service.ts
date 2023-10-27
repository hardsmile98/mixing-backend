import { Injectable } from '@nestjs/common';
import { CheckLetterDto, GetLetterQueryDto } from './dto';
import { BitcoinService } from 'src/bitcoin/bitcoin.service';

@Injectable()
export class LettersService {
  constructor(private bitcoinService: BitcoinService) {}

  async getLetter(query: GetLetterQueryDto) {
    return this.bitcoinService.verifyMessage(
      'message',
      'INJKeGD3iCnA5somNJATWB0GTskGQG+uFFKoSu3kzqksAcEHu9EX3jfUNr9Z4gv3Zd/ECc6N4qgfqOAEVAXd/mc=',
    );
  }

  async checkLetter(dto: CheckLetterDto) {
    return {};
  }
}
