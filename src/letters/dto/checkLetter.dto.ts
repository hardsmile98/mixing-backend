import { IsNotEmpty } from 'class-validator';

export class CheckLetterDto {
  @IsNotEmpty()
  message: number;
}
