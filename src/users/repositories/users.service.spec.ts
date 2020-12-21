/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import {
  DeepPartial,
  DeleteResult,
  FindManyOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from '../models/user/user.model';
import { UsersService } from './users.service';

const userMock1: User = {
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

const updateResultMock: UpdateResult = {
  raw: null,
  generatedMaps: [],
};

const deleteMock: DeleteResult = {
  raw: null,
};

class UserRepositoryMock {
  public create(entityLike: DeepPartial<User>): User {
    return userMock1;
  }
  public async save(entity: User): Promise<User> {
    return of(userMock1).toPromise();
  }

  public async findOne(id: string): Promise<User> {
    return of(userMock1).toPromise();
  }

  public async update(
    criteria: string,
    partialEntity: Partial<User>,
  ): Promise<UpdateResult> {
    return of(updateResultMock).toPromise();
  }

  public async find(options?: FindManyOptions<User>): Promise<Array<User>> {
    return of([userMock1]).toPromise();
  }

  public async delete(id: number): Promise<DeleteResult> {
    return of(deleteMock).toPromise();
  }
}

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
        UsersService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add user', async () => {
    const createSpy = jest
      .spyOn(userRepository, 'create')
      .mockReturnValue(userMock1);
    const saveSpy = jest
      .spyOn(userRepository, 'save')
      .mockReturnValue(new Promise(resolve => resolve(userMock1)));
    const addResult = await service.add(userMock1);
    expect(createSpy).toBeCalled();
    expect(saveSpy).toBeCalled();
    expect(addResult.id).toEqual(userMock1.id);
  });

  it('should update user', async () => {
    const updateSpy = jest
      .spyOn(userRepository, 'save')
      .mockImplementation(u => of(userMock1).toPromise());
    const findOneSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockReturnValue(new Promise(resolve => resolve(userMock1)));
    const updateResult = await service.update(userMock1.id, {
      username: 'newUsername',
    });
    expect(updateSpy).toBeCalled();
    expect(findOneSpy).toBeCalled();
    expect(updateResult.id).toEqual(userMock1.id);
  });

  it('should find user by username', async () => {
    const findSpy = jest
      .spyOn(userRepository, 'find')
      .mockReturnValue(of([userMock1]).toPromise());
    const foundUser = await service.findByUsername(userMock1.username);
    expect(findSpy).toBeCalled();
    expect(foundUser.id).toEqual(userMock1.id);
  });

  it('should find all users', async () => {
    const findSpy = jest
      .spyOn(userRepository, 'find')
      .mockReturnValue(of([userMock1]).toPromise());
    const foundUsers = await service.findAll();
    expect(findSpy).toBeCalled();
    expect(foundUsers.length).toEqual(1);
    expect(foundUsers[0].id).toEqual(userMock1.id);
  });

  it('should delete user', async () => {
    const deleteSpy = jest
      .spyOn(userRepository, 'delete')
      .mockReturnValue(of(deleteMock).toPromise());
    const deleteResult = await service.delete(userMock1.id);
    expect(deleteSpy).toBeCalled();
    expect(deleteResult).toBeTruthy();
  });
});
