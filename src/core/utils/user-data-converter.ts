import { UserDetails } from 'src/users/models/user/user-details.model';
import { UserNutritionGoals } from 'src/users/models/user/user-nutrition-goals.model';
import { UserWithoutSensitiveData } from 'src/users/models/user/user-without-sensitive-data';
import { User } from 'src/users/models/user/user.model';

export class UserDataConverter {
  // TODO test with additional fields
  public trimUserSensitiveData(user: User): UserWithoutSensitiveData {
    const userWithoutSensitiveData: UserWithoutSensitiveData = this.createUser(
      user,
      user.nutritionGoals,
      user.details,
    );
    return userWithoutSensitiveData;
  }

  private createUser(
    user: User,
    nutritionGoals: UserNutritionGoals,
    details: UserDetails,
  ): UserWithoutSensitiveData {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      authenticationLevel: user.authenticationLevel,
      nutritionGoals: this.createNutritionGoals(nutritionGoals),
      details: this.createDetails(details),
    };
  }

  private createNutritionGoals(
    nutritionGoals: UserNutritionGoals,
  ): Omit<
    UserNutritionGoals,
    'user'
  > {
    return {
      id: nutritionGoals.id,
      kcal: nutritionGoals.kcal,
      protein: nutritionGoals.protein,
      carbs: nutritionGoals.carbs,
      fats: nutritionGoals.fats,
    };
  }

  private createDetails(
    details: UserDetails,
  ): Omit<
    UserDetails,
    'user'
  > {
    return {
      id: details.id,
      age: details.age,
      height: details.height,
      weight: details.weight,
      sex: details.sex,
    };
  }

  public trimUsersSensitiveData(
    users: Array<User>,
  ): Array<UserWithoutSensitiveData> {
    return users.map((u: User) => this.trimUserSensitiveData(u));
  }
}
