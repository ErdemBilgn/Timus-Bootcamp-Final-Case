import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class FactoryDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  firm_id: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @IsNotEmpty()
  @IsNumber()
  usage_kw: number;

  @IsNotEmpty()
  @IsNumber()
  usage_price: number;

  @IsNotEmpty()
  @IsBoolean()
  discounted_price: boolean;
}
