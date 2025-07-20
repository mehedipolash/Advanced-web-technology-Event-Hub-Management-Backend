import { IsNumber, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class AddDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  class: number;

  @IsNotEmpty()
  @IsNumber()
  roll: number;
}
