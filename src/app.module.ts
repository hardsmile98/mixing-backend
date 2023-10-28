import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MixingModule } from './mixing/mixing.module';
import { LettersModule } from './letters/letters.module';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    MixingModule,
    LettersModule,
    BitcoinModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
