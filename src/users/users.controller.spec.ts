/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import {
  user1,
  user1Modified,
  userDTO1Modified,
} from '@tests/users/mock-data.model';
import { of } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { UserDTO } from './models/user/user-dto.model';
import { User } from './models/user/user.model';
import { UsersService } from './repositories/users.service';
import { UsersController } from './users.controller';

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
    ((usersService as unknown) as UsersServiceMock).setReturnedValue(user1);
    const findByUsernameSpy = jest.spyOn(usersService, 'findByUsername');
    const credentials = (await controller.getUserCredentials('mike', null))[0];

    expect(credentials).toBeTruthy();
    expect(findByUsernameSpy).toHaveBeenCalled();
    expect(credentials.id).toEqual(user1.id);
    expect(credentials.username).toEqual(user1.username);
    expect(credentials.email).toEqual(user1.email);
    expect(credentials.phoneNumber).toEqual(user1.phoneNumber);
    expect((credentials as User)?.password).toBeFalsy();
    expect(credentials.details.id).toEqual(user1.details.id);
    expect(credentials.details.age).toEqual(user1.details.age);
    expect(credentials.details.height).toEqual(user1.details.height);
    expect(credentials.details.weight).toEqual(user1.details.weight);
    expect(credentials.details.sex).toEqual(user1.details.sex);
  });

  it('should update user credentials', async () => {
    ((usersService as unknown) as UsersServiceMock).setReturnedValue(
      user1Modified,
    );
    const updateSpy = jest.spyOn(usersService, 'update');
    const credentials = await controller.updateUserCredentials(
      1,
      userDTO1Modified,
    );

    expect(credentials).toBeTruthy();
    expect(updateSpy).toHaveBeenCalled();
    expect(credentials.id).toEqual(user1.id);
    expect(credentials.username).toEqual(user1Modified.username);
    expect(credentials.email).toEqual(user1Modified.email);
    expect(credentials.phoneNumber).toEqual(user1Modified.phoneNumber);
    expect(credentials.firstName).toEqual(user1Modified.firstName);
    expect(credentials.lastName).toEqual(user1Modified.lastName);
    expect(credentials.details.id).toEqual(user1Modified.details.id);
    expect(credentials.details.age).toEqual(user1Modified.details.age);
    expect(credentials.details.height).toEqual(user1Modified.details.height);
    expect(credentials.details.weight).toEqual(user1Modified.details.weight);
    expect(credentials.details.sex).toEqual(user1Modified.details.sex);
  });
});
