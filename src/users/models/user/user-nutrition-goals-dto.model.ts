import { IsInt, Max, Min } from 'class-validator';

export class UserNutritionGoalsDTO {
  @IsInt()
  @Min(600)
  @Max(20000)
  public kcal: number;

  @IsInt()
  @Min(1)
  @Max(98)
  public protein: number;

  @IsInt()
  @Min(1)
  @Max(98)
  public carbs: number;

  @IsInt()
  @Min(1)
  @Max(98)
  public fats: number;
}
