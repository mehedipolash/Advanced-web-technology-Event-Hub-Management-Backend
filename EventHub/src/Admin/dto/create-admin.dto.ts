import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string; // plain on input, will hash in service
}
