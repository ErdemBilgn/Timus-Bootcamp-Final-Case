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
  firmName: string;

  @IsNotEmpty()
  @IsDateString()
  membershipDate: string;

  @IsNotEmpty()
  @IsDateString()
  membershipEndDate: string;

  @IsNotEmpty()
  @IsNumber()
  employeeCount: number;

  @IsNotEmpty()
  @IsBoolean()
  freeMember: boolean;
}
