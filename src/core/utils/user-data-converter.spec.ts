/* eslint-disable @typescript-eslint/no-empty-function */

import { user1 } from '@tests/users/mock-data.model';
import { UserWithoutSensitiveData } from '../../users/models/user/user-without-sensitive-data';
import { User } from '../../users/models/user/user.model';
import { UserDataConverter } from './user-data-converter';
import { isEqual } from 'lodash';

const usersMock: Array<User> = [user1, user1];

const userWithoutSensitiveDataMock: UserWithoutSensitiveData = {
  id: 1,
  username: 'usernameMock',
  email: 'someemail@gmail.com',
  birthDate: null,
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  authenticationLevel: 1,
  nutritionGoals: { id: 1, kcal: 3000, protein: 25, carbs: 50, fats: 25 },
  details: { id: 1, age: 30, height: 180, weight: 75, sex: 'MALE' },
};

describe('UserDataConverter', () => {
  it('should be defined', () => {
    expect(new UserDataConverter()).toBeDefined();
  });

  it('should convert user to user without sensitive data', () => {
    const userDataConverter = new UserDataConverter();

    const userWithoutSensitiveData = userDataConverter.trimUserSensitiveData(
      user1,
    );

    expect(isEqual(userWithoutSensitiveData, userWithoutSensitiveDataMock));
    expect((userWithoutSensitiveData as User)?.password).toBeFalsy();
  });

  it('should convert array of users to array of users without sensitive data', () => {
    const userDataConverter = new UserDataConverter();

    const usersWithoutSensitiveData = userDataConverter.trimUsersSensitiveData(
      usersMock,
    );

    expect(isEqual(usersWithoutSensitiveData[0], userWithoutSensitiveDataMock));
    expect(isEqual(usersWithoutSensitiveData[1], userWithoutSensitiveDataMock));
    expect((usersWithoutSensitiveData[0] as User)?.password).toBeFalsy();
    expect((usersWithoutSensitiveData[1] as User)?.password).toBeFalsy();
  });
});
