import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const Client = require('bitcoin-core');

@Injectable()
export class BitcoinService implements OnModuleInit {
  mainClient = null;

  config = {
    network: this.configService.get<string>('BITCOIN_NETWORK'),
    host: this.configService.get<string>('BITCOIN_HOST'),
    port: this.configService.get<number>('BITCOIN_PORT'),
    username: this.configService.get<string>('BITCOIN_USERNAME'),
    password: this.configService.get<string>('BITCOIN_PASSWORD'),
  };

  wallet = this.configService.get<string>('BITCOIN_MAIN_WALLET');
  letterLabel = this.configService.get<string>('LETTER_ADDRESS_LABEL');

  constructor(private readonly configService: ConfigService) {
    this.mainClient = new Client({
      ...this.config,
      wallet: this.wallet,
    });
  }

  async getMainWalletAddressByLabel(label: string) {
    try {
      const addressesByLabel = await this.mainClient.getAddressesByLabel(label);
      return Object.keys(addressesByLabel || {});
    } catch (e) {
      return [];
    }
  }

  async getMainWalletNewAddress(label?: string, type?: string) {
    try {
      const addressesByLabel = await this.mainClient.getNewAddress(label, type);
      return addressesByLabel;
    } catch (e) {
      return null;
    }
  }

  async getLetterAddress() {
    const addresses = await this.getMainWalletAddressByLabel(this.letterLabel);

    if (!addresses.length) {
      return null;
    }

    return addresses[0];
  }

  // if the main wallet is missing, it creates
  async createMainWallet() {
    const wallets = await this.mainClient.listWallets();

    if (!wallets.includes(this.wallet)) {
      await this.mainClient.createWallet(this.wallet);

      this.mainClient = new Client({
        ...this.config,
        wallet: this.wallet,
      });
    }
  }

  // if the letter adress is missing, it creates
  async createLetterAddress() {
    const letterAddress = await this.getLetterAddress();

    if (letterAddress) {
      return;
    }

    await this.getMainWalletNewAddress(this.letterLabel, 'legacy');
  }

  async onModuleInit() {
    await this.createMainWallet();
    await this.createLetterAddress();
  }

  async signMessage(message: string) {
    const letterAddress = await this.getLetterAddress();

    if (!letterAddress) {
      throw new Error('Letter address is not exist');
    }

    try {
      const signature = await this.mainClient.signMessage(
        letterAddress,
        message,
      );

      return { signature, letterAddress };
    } catch (e) {
      return null;
    }
  }

  async verifyMessage(message: string, signature: string) {
    const letterAddress = await this.getLetterAddress();

    if (!letterAddress) {
      throw new Error('Letter address is not exist');
    }

    try {
      const virifyAnswer = await this.mainClient.verifyMessage(
        letterAddress,
        signature,
        message,
      );

      return virifyAnswer;
    } catch (e) {
      return false;
    }
  }
}
