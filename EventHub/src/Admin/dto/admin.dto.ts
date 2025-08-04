import { IsNotEmpty, IsIn, IsInt, Min, MaxLength, IsOptional } from 'class-validator';

export class AdminDto {
  @IsNotEmpty()
  @MaxLength(100)
  fullName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;

  @IsOptional() // r
  @IsIn(['active', 'inactive'])//c
  status?: 'active' | 'inactive';
}
