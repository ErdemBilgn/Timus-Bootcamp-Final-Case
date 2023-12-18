import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @MinLength(8, { message: 'Name should be at least 8 characters long' })
  @IsString()
  @Matches(/^[^\d]+$/, {
    message: 'name should not contain any numeric values',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$/, {
    message:
      'Password should contain at least one uppercase letter and one number',
  })
  password: string;

  @IsNotEmpty()
  @IsIn(['admin', 'editor'])
  authority: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(8, { message: 'Name should be at least 8 characters long' })
  @IsString()
  @Matches(/^[^\d]+$/, {
    message: 'name should not contain any numeric values',
  })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(['admin', 'editor'])
  authority: string;
}
