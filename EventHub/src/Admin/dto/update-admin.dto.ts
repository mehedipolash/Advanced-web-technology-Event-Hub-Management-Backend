import { IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  fullName?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  age?: number;
}
