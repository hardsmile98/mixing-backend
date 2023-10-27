import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LettersService } from './letters.service';
import { CheckLetterDto, GetLetterQueryDto } from './dto';

@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Get('/')
  getLetter(@Query() query: GetLetterQueryDto) {
    return this.lettersService.getLetter(query);
  }

  @Post('/check')
  checkLetter(@Body() dto: CheckLetterDto) {
    return this.lettersService.checkLetter(dto);
  }
}
