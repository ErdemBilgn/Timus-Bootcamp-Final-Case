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
  firmId: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  usageKw: number;

  @IsNotEmpty()
  @IsNumber()
  usagePrice: number;

  @IsNotEmpty()
  @IsBoolean()
  discountedPrice: boolean;
}
