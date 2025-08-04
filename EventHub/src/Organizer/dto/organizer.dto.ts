import { IsNotEmpty, MaxLength } from 'class-validator';

export class OrganizerDto {
  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @MaxLength(150)
  fullName: string;
}
