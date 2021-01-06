import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { MealEatTimeType, ProductDTO } from '..';

export class UserProductWithProductDTO {
  @IsInt()
  @Min(1)
  @IsOptional()
  public id?: number;

  @ValidateNested({ each: true })
  @Type(type => ProductDTO)
  public product: ProductDTO;

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
