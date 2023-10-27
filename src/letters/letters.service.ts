import { Injectable } from '@nestjs/common';
import { CheckLetterDto, GetLetterQueryDto } from './dto';
import { BitcoinService } from 'src/bitcoin/bitcoin.service';

@Injectable()
export class LettersService {
  constructor(private bitcoinService: BitcoinService) {}

  getAddressesForMessage(addresses: Array<any>) {
    return addresses
      .map((item) => `${item.percent}% to ${item.address}`)
      .join(', ');
  }

  async getLetter(query: GetLetterQueryDto) {
    // get order data
    const addresses = [
      {
        address: 'uerjwenrwjeriwerrwjerniwerijew',
        percent: 65,
      },
      {
        address: '2rewrweiririu3n2u423i422i4u23',
        percent: 35,
      },
    ];

    const transferAddress = 'tkjir22meiqw34ertereiriorw3';

    const message = `We confirm that we have generated the address ${transferAddress} in order to transfer incoming amount (minus fee) to the following addresses: ${this.getAddressesForMessage(
      addresses,
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

    return await this.bitcoinService.verifyMessage(message, signature);
  }
}
