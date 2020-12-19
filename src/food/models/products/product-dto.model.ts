import { IsInt, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class ProductDTO {
  @IsInt()
  @Min(1)
  @IsOptional()
  public id?: number;

  @IsString()
  @Length(1, 30)
  public producer: string;

  @IsString()
  @Length(1, 30)
  public name: string;

  @IsString()
  @Length(1, 30)
  public unit: string;

  @IsNumber()
  @Min(1)
  public amount: number;

  @IsNumber()
  @Min(0)
  public kcal: number;

  @IsNumber()
  @Min(0)
  public protein: number;

  @IsNumber()
  @Min(0)
  public carbohydrates: number;

  @IsNumber()
  @Min(0)
  public fats: number;

  @IsInt()
  @Min(1)
  public creatorId: number;
}
