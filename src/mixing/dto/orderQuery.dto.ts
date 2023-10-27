import { Length } from 'class-validator';

export class OrderQueryDto {
  @Length(36, 36)
  uuid: number;
}
