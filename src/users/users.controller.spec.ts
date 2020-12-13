/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { UserDTO } from './models/user/user-dto.model';
import { User } from './models/user/user.model';
import { UsersService } from './repositories/users.service';
import { UsersController } from './users.controller';

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
  hashPassword: () => {},
  authenticationLevel: 1,
  isActive: true,
  userFriends1: null,
  userFriends2: null,
  productCreator: null,
  userProducts: null,
};

const userModified: UserDTO = {
  username: 'usernameMockModified',
  password: 'secretPassword123Modified',
  email: 'someemail@gmail.comModified',
  birthDate: new Date(),
  phoneNumber: '666777888Modified',
  firstName: 'firstNameModified',
  lastName: 'lastNameModified',
};

const userMockModified: User = {
  id: 1,
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  hashPassword: () => {},
  ...userModified,
  userFriends1: null,
  userFriends2: null,
  productCreator: null,
  userProducts: null,
};

const deleteMock: DeleteResult = {
  raw: null,
};

export class UsersServiceMock {
  private userMock: User;
  public setReturnedValue(returnedValue: User): void {
    this.userMock = returnedValue;
  }
  public async add(user: UserDTO): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async update(id: number, user: Partial<User>): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async findById(id: number): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async findByUsername(username: string): Promise<User> {
    return of(this.userMock).toPromise();
  }

  public async findAll(): Promise<Array<User>> {
    return of([this.userMock]).toPromise();
  }

  public delete(id: number): Promise<DeleteResult> {
    return of(deleteMock).toPromise();
  }
}

describe('Users Controller', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get user credentials by usernames', async () => {
    ((usersService as unknown) as UsersServiceMock).setReturnedValue(userMock);
    const findByUsernameSpy = jest.spyOn(usersService, 'findByUsername');
    const credentials = (await controller.getUserCredentials('mike', null))[0];

    expect(credentials).toBeTruthy();
    expect(findByUsernameSpy).toHaveBeenCalled();
    expect(credentials.id).toEqual(userMock.id);
    expect(credentials.username).toEqual(userMock.username);
    expect(credentials.email).toEqual(userMock.email);
    expect(credentials.phoneNumber).toEqual(userMock.phoneNumber);
    expect((credentials as User)?.password).toBeFalsy();
  });

  it('should update user credentials', async () => {
    ((usersService as unknown) as UsersServiceMock).setReturnedValue(
      userMockModified,
    );
    const updateSpy = jest.spyOn(usersService, 'update');
    const credentials = await controller.updateUserCredentials(1, userModified);

    expect(credentials).toBeTruthy();
    expect(updateSpy).toHaveBeenCalled();
    expect(credentials.id).toEqual(userMock.id);
    expect(credentials.username).toEqual(userMockModified.username);
    expect(credentials.email).toEqual(userMockModified.email);
    expect(credentials.phoneNumber).toEqual(userMockModified.phoneNumber);
    expect(credentials.firstName).toEqual(userMockModified.firstName);
    expect(credentials.lastName).toEqual(userMockModified.lastName);
  });
});
