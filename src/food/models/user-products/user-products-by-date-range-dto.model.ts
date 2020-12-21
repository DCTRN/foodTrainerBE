import { IsDateString, IsInt, Min } from 'class-validator';

export class UserProductsByDateRangeDTO {
  @IsInt()
  @Min(1)
  userId: number;

  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;
}
