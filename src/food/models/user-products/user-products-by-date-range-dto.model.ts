import { IsDateString, IsInt, Min } from 'class-validator';

export class UserProductsByDateRangeDTO {
  @IsInt()
  @Min(1)
  public userId: number;

  @IsDateString()
  public start: Date;

  @IsDateString()
  public end: Date;
}
