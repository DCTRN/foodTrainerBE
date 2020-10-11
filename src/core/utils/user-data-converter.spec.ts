import { UserWithoutSensitiveData } from 'src/users/models/user-without-sensitive-data';
import { User } from 'src/users/models/user.model';
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hashPassword(): void {},
  userFriends1: null,
  userFriends2: null,
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  hashPassword(): void {},
  userFriends1: null,
  userFriends2: null,
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
