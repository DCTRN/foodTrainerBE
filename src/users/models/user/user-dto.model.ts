import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { UserDetailsDTO } from './user-details-dto.model';

export class UserDTO {
  @IsString()
  @Length(3, 20)
  public username: string;

  // TODO this should me optional but the API model with FE works with this mandatory - to check
  @IsOptional()
  @IsString()
  @Length(6, 30)
  public password?: string;

  @IsEmail()
  public email: string;

  @IsDateString()
  public birthDate: Date;

  @IsString()
  @Length(9)
  public phoneNumber: string;

  @IsString()
  @Length(3, 20)
  public firstName: string;

  @IsString()
  @Length(3, 20)
  public lastName: string;

  @ValidateNested()
  public details: UserDetailsDTO;
}
