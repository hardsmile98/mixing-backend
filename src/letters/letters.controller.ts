import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { LettersService } from './letters.service';
import { CheckLetterDto, GetLetterQueryDto } from './dto';
import { FileExceptionFilter } from './filters';

@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Header('Content-type', 'application/octet-stream')
  @Header('Content-disposition', 'attachment; filename=letter.txt')
  @Get('/')
  @UseFilters(FileExceptionFilter)
  getLetter(@Query() query: GetLetterQueryDto) {
    return this.lettersService.getLetter(query);
  }

  @Post('/check')
  checkLetter(@Body() dto: CheckLetterDto) {
    return this.lettersService.checkLetter(dto);
  }
}
