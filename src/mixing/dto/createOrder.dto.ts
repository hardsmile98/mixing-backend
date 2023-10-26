import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Address {
  @IsNotEmpty()
  @MinLength(25)
  @MaxLength(34)
  address: string;

  @IsNotEmpty()
  delay: number;

  @IsNotEmpty()
  @Min(0)
  @Max(100)
  percent: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => Address)
  @ValidateNested({ each: true })
  addresses: Array<Address>;

  @IsNotEmpty()
  @Min(0)
  @Max(10)
  feePercent: number;

  @Optional()
  mixCode?: string;
}
