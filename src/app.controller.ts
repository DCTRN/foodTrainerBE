import { Controller } from '@nestjs/common';
import { IsDateString, IsEmail, IsString, Length } from 'class-validator';
import { AppService } from './app.service';

export class UserLoginCredentials {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;
}

export class UserDTO {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsString()
  @Length(6, 30)
  password: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthDate: Date;

  @IsString()
  @Length(9)
  phoneNumber: string;

  @IsString()
  @Length(3, 20)
  firstName: string;

  @IsString()
  @Length(3, 20)
  lastName: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
