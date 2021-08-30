import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class UserDetailsDTO {
  @IsInt()
  @Min(1)
  @Max(100)
  public age: number;

  @IsInt()
  @Min(50)
  @Max(250)
  public height: number;

  @IsInt()
  @Min(1)
  @Max(250)
  public weight: number;

  @IsString()
  @Length(1, 30)
  public sex: string;
}
