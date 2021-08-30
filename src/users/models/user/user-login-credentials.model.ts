import { IsString, Length } from 'class-validator';

export class UserLoginCredentials {
  @IsString()
  @Length(3, 20)
  public username: string;

  @IsString()
  @Length(6, 30)
  public password: string;
}
