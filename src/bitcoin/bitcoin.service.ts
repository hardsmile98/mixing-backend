import { Injectable } from '@nestjs/common';

@Injectable()
export class BitcoinService {
  async encypt() {
    return { ctypt: true };
  }
}
