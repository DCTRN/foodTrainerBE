import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { MealEatTimeType } from '..';

export class UserProductDTO {
  @IsInt()
  @Min(1)
  @IsOptional()
  public id?: number;

  @IsInt()
  @Min(1)
  public productId: number;

  @IsNumber()
  @Min(1)
  public amount: number;

  @IsDateString()
  public date: Date;

  // @IsEnum(MealEatTimeType)
  public mealTimeType: MealEatTimeType;

  @IsInt()
  @Min(1)
  public userId: number;
}
