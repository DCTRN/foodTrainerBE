import { IsDateString, IsInt, Min } from 'class-validator';

export class UserProductsByDateDTO {
  @IsInt()
  @Min(1)
  public userId: number;

  @IsDateString()
  public date: Date;
}
