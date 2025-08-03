import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class OrganizerDto {
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must only contain alphabets',
  })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be valid' })
  @Matches(/\.xyz$/, {
    message: 'Email must end with .xyz domain',
  })
  email: string;

  @IsNotEmpty({ message: 'NID number is required' })
  @Matches(/^\d{10,17}$/, {
    message: 'NID number must be between 10 and 17 digits',
  })
  nidNumber: string;
}
