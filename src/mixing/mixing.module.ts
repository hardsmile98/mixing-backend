import { Module } from '@nestjs/common';
import { MixingController } from './mixing.controller';
import { MixingService } from './mixing.service';

@Module({
  controllers: [MixingController],
  providers: [MixingService],
})
export class MixingModule {}
