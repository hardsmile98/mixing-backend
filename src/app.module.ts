import { Module } from '@nestjs/common';
import { MixingModule } from './mixing/mixing.module';
import { LettersModule } from './letters/letters.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';

@Module({
  imports: [MixingModule, LettersModule, BitcoinModule],
})
export class AppModule {}
