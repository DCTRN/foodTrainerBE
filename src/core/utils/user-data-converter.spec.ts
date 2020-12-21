/* eslint-disable @typescript-eslint/no-empty-function */

import { UserWithoutSensitiveData } from '../../users/models/user/user-without-sensitive-data';
import { User } from '../../users/models/user/user.model';
import { UserDataConverter } from './user-data-converter';

const userMock: User = {
  id: 1,
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  hashPassword: () => {},
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
};

const userMock2: User = {
  id: 1,
  username: 'usernameMock',
  password: 'secretPassword123',
  email: 'someemail@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  hashPassword: () => {},
  userFriends1: null,
  userFriends2: null,
  products: null,
  userProducts: null,
};

const usersMock: Array<User> = [userMock, userMock2];

const userWithousSensitiveDataMock: UserWithoutSensitiveData = {
  id: 1,
  username: 'usernameMock',
  email: 'someemail@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123123123',
  firstName: 'firstName',
  lastName: 'lastName',
  authenticationLevel: 1,
};

describe('UserDataConverter', () => {
  it('should be defined', () => {
    expect(new UserDataConverter()).toBeDefined();
  });

  it('should convert user to user without sensitive data', () => {
    const userDataConverter = new UserDataConverter();

    const userWithoutSensitiveData = userDataConverter.trimUserSensitiveData(
      userMock,
    );

    expect(userWithoutSensitiveData).toBeTruthy();
    expect((userWithoutSensitiveData as User)?.password).toBeFalsy();
  });

  it('should convert array of users to array of users without sensitive data', () => {
    const userDataConverter = new UserDataConverter();

    const usersWithoutSensitiveData = userDataConverter.trimUsersSensitiveData(
      usersMock,
    );

    expect(usersWithoutSensitiveData).toBeTruthy();
    expect(usersWithoutSensitiveData.length).toEqual(2);
    expect((usersWithoutSensitiveData[0] as User)?.password).toBeFalsy();
    expect((usersWithoutSensitiveData[1] as User)?.password).toBeFalsy();
  });
});
