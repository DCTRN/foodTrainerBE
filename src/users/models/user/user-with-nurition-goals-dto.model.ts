import { ValidateNested } from 'class-validator';
import { UserDTO } from './user-dto.model';
import { UserNutritionGoalsDTO } from './user-nutrition-goals-dto.model';

export class UserWithNutritionGoalsDTO extends UserDTO {
  @ValidateNested()
  public nutritionGoals: UserNutritionGoalsDTO;
}
