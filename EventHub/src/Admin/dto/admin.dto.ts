import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  IsIn,
  IsNumberString,
} from 'class-validator';

export class AdminDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  @Matches(/@aiub\.edu$/, { message: 'Email must be from aiub.edu domain' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/.*[A-Z].*/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsIn(['male', 'female'], { message: 'Gender must be either male or female' })
  gender: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsNumberString({}, { message: 'Phone number must contain only numbers' })
  phoneNumber: string;
}
