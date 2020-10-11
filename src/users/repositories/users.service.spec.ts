import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import {
  DeepPartial,
  Repository,
  UpdateResult,
  FindManyOptions,
  DeleteResult,
} from 'typeorm';
import { User } from '../models/user.model';
import { UsersService } from './users.service';

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
  hashPassword(): void {},
  userFriends1: null,
  userFriends2: null,
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
    return userMock;
  }
  public async save(entity: User): Promise<User> {
    return of(userMock).toPromise();
  }

  public async findOne(id: string): Promise<User> {
    return of(userMock).toPromise();
  }

  public async update(
    criteria: string,
    partialEntity: Partial<User>,
  ): Promise<UpdateResult> {
    return of(updateResultMock).toPromise();
  }

  public async find(options?: FindManyOptions<User>): Promise<Array<User>> {
    return of([userMock]).toPromise();
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
      .mockReturnValue(userMock);
    const saveSpy = jest
      .spyOn(userRepository, 'save')
      .mockReturnValue(new Promise(resolve => resolve(userMock)));
    const addResult = await service.add(userMock);
    expect(createSpy).toBeCalled();
    expect(saveSpy).toBeCalled();
    expect(addResult.id).toEqual(userMock.id);
  });

  it('should update user', async () => {
    const updateSpy = jest
      .spyOn(userRepository, 'update')
      .mockReturnValue(of(updateResultMock).toPromise());
    const findOneSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockReturnValue(new Promise(resolve => resolve(userMock)));
    const updateResult = await service.update(userMock.id, {
      username: 'newUsername',
    });
    expect(updateSpy).toBeCalled();
    expect(findOneSpy).toBeCalled();
    expect(updateResult.id).toEqual(userMock.id);
  });

  it('should find user by username', async () => {
    const findSpy = jest
      .spyOn(userRepository, 'find')
      .mockReturnValue(of([userMock]).toPromise());
    const foundUser = await service.findByUsername(userMock.username);
    expect(findSpy).toBeCalled();
    expect(foundUser.id).toEqual(userMock.id);
  });

  it('should find all users', async () => {
    const findSpy = jest
      .spyOn(userRepository, 'find')
      .mockReturnValue(of([userMock]).toPromise());
    const foundUsers = await service.findAll();
    expect(findSpy).toBeCalled();
    expect(foundUsers.length).toEqual(1);
    expect(foundUsers[0].id).toEqual(userMock.id);
  });

  it('should delete user', async () => {
    const deleteSpy = jest
      .spyOn(userRepository, 'delete')
      .mockReturnValue(of(deleteMock).toPromise());
    const deleteResult = await service.delete(userMock.id);
    expect(deleteSpy).toBeCalled();
    expect(deleteResult).toBeTruthy();
  });
});
