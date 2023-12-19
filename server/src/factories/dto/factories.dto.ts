import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class FactoriesDto {
  @IsNotEmpty()
  @IsString()
  firm_name: string;

  @IsNotEmpty()
  @IsDateString()
  membership_date: string;

  @IsNotEmpty()
  @IsDateString()
  membership_end_date: string;

  @IsNotEmpty()
  @IsNumber()
  employee_count: number;

  @IsNotEmpty()
  @IsBoolean()
  free_member: boolean;
}
