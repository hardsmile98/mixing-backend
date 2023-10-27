import { Module } from '@nestjs/common';
import { MixingModule } from './mixing/mixing.module';
import { LettersModule } from './letters/letters.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MixingModule,
    LettersModule,
    BitcoinModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
