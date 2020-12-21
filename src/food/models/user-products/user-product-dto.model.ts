import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { MealEatTimeType, ProductDTO } from '..';

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
