import { UserWithoutSensitiveData } from 'src/users/models/user/user-without-sensitive-data';
import { User } from 'src/users/models/user/user.model';

export class UserDataConverter {
  public trimUserSensitiveData(user: User): UserWithoutSensitiveData {
    const userWithoutSensitiveData: UserWithoutSensitiveData = {
      id: user.id,
      username: user.username,
      email: user.email,
      birthDate: user.birthDate,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      authenticationLevel: user.authenticationLevel,
    };
    return userWithoutSensitiveData;
  }

  public trimUsersSensitiveData(
    users: Array<User>,
  ): Array<UserWithoutSensitiveData> {
    return users.map((u: User) => this.trimUserSensitiveData(u));
  }
}
