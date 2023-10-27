import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Client = require('bitcoin-core');

@Injectable()
export class BitcoinService {
  mainClient = null;

  constructor(private readonly configService: ConfigService) {
    const network = this.configService.get<string>('BITCOIN_NETWORK');
    const host = this.configService.get<string>('BITCOIN_HOST');
    const port = this.configService.get<number>('BITCOIN_PORT');
    const username = this.configService.get<string>('BITCOIN_USERNAME');
    const password = this.configService.get<string>('BITCOIN_PASSWORD');
    const wallet = this.configService.get<string>('BITCOIN_MAIN_WALLET');

    this.mainClient = new Client({
      network,
      host,
      port,
      username,
      password,
      wallet,
    });
  }

  async encypt() {
    try {
      const info = await this.mainClient.listWallets();
      return { info };
    } catch (e) {
      console.log(e);
      return {};
    }
  }
}
