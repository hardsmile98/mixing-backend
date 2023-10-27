import { Module } from '@nestjs/common';
import { MixingController } from './mixing.controller';
import { MixingService } from './mixing.service';
import { BitcoinModule } from 'src/bitcoin/bitcoin.module';

@Module({
  controllers: [MixingController],
  providers: [MixingService],
  imports: [BitcoinModule],
})
export class MixingModule {}
