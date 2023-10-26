import { Module } from '@nestjs/common';
import { MixingModule } from './mixing/mixing.module';
import { LettersModule } from './letters/letters.module';

@Module({
  imports: [MixingModule, LettersModule],
})
export class AppModule {}
