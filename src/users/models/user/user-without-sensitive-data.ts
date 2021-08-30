import { UserDetails } from './user-details.model';
import { UserNutritionGoals } from './user-nutrition-goals.model';

export class UserWithoutSensitiveData {
  public id: number;
  public username: string;
  public email: string;
  public birthDate: Date;
  public phoneNumber: string;
  public firstName: string;
  public lastName: string;
  public authenticationLevel: number;
  public nutritionGoals: Omit<UserNutritionGoals, 'user'>;
  public details: Omit<UserDetails, 'user'>;
}
