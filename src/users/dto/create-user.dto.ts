import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsString()
  age: string;

  @IsString()
  gender: string;

  @IsString()
  dateOfBirth: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  role: string;
}
