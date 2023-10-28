import { Length } from 'class-validator';

export class GetLetterQueryDto {
  @Length(36, 36)
  uuid: string;
}
