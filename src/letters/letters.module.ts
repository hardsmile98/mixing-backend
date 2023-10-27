import { Module } from '@nestjs/common';
import { LettersController } from './letters.controller';
import { LettersService } from './letters.service';
import { BitcoinModule } from 'src/bitcoin/bitcoin.module';

@Module({
  controllers: [LettersController],
  providers: [LettersService],
  imports: [BitcoinModule],
})
export class LettersModule {}
