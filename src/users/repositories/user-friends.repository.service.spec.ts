/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { IUserFriends } from '../models/user-friends/user-friends.interface';
import { UserFriends } from '../models/user-friends/user-friends.model';
import { UserDTO } from '../models/user/user-dto.model';
import { User } from '../models/user/user.model';
import { UserFriendsService } from './user-friends.repository.service';
import { UsersService } from './users.service';

const dbUserFriendsMock: UserFriends = {
  id: 1,
  user: null,
  friend: null,
  isAccepted: false,
  friendshipRequesterId: 1,
  friendshipAcceptDate: null,
  friendshipRequestDate: null,
  createFriendshipAcceptDate: null,
};

const userFriendsMock: IUserFriends = {
  userId: 1,
  friendId: 2,
  isAccepted: false,
};

const updateResultMock: UpdateResult = {
  raw: null,
  generatedMaps: [],
};

const deleteMock: DeleteResult = {
  raw: null,
};

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
  productCreator: null,
  userProducts: null,
};

const userMock2: User = {
  id: 2,
  username: 'usernameMock2',
  password: 'secretPassword123',
  email: 'someemail2@gmail.com',
  birthDate: new Date(),
  phoneNumber: '123193123',
  firstName: 'firstName',
  lastName: 'lastName',
  accountCreationDate: new Date(),
  authenticationLevel: 1,
  isActive: true,
  hashPassword: () => {},
  userFriends1: null,
  userFriends2: null,
  productCreator: null,
  userProducts: null,
};

const getManySpy = jest.fn();

const orWhereForFindByUserIdSpy = jest
  .fn()
  .mockImplementation(() => ({ getMany: getManySpy }));

const whereForFindByUserIdSpy = jest
  .fn()
  .mockImplementation(() => ({ orWhere: orWhereForFindByUserIdSpy }));

const innerJoinAndSelecForFindByUserIdtSpy2 = jest
  .fn()
  .mockImplementation(() => ({ where: whereForFindByUserIdSpy }));

const innerJoinAndSelectForFindByUserIdSpy1 = jest
  .fn()
  .mockImplementation(() => ({
    innerJoinAndSelect: innerJoinAndSelecForFindByUserIdtSpy2,
  }));

const createQueryBuilderForFindByUserIdSpy = jest
  .fn()
  .mockImplementation(() => ({
    innerJoinAndSelect: innerJoinAndSelectForFindByUserIdSpy1,
  }));

// add userFriends queryBuilderSpy
const andWhereForAddUserFriendSpy2 = jest
  .fn()
  .mockImplementation(() => ({ getMany: getManySpy }));

const orWhereForAddUserFriendSpy = jest
  .fn()
  .mockImplementation(() => ({ andWhere: andWhereForAddUserFriendSpy2 }));

const andWhereForAddUserFriendSpy1 = jest
  .fn()
  .mockImplementation(() => ({ orWhere: orWhereForAddUserFriendSpy }));

const whereForAddUserFriendSpy = jest
  .fn()
  .mockImplementation(() => ({ andWhere: andWhereForAddUserFriendSpy1 }));

const innerJoinAndSelecForForAddUserFriendSpy2 = jest
  .fn()
  .mockImplementation(() => ({ where: whereForAddUserFriendSpy }));

const innerJoinAndSelectForForAddUserFriendSpy1 = jest
  .fn()
  .mockImplementation(() => ({
    innerJoinAndSelect: innerJoinAndSelecForForAddUserFriendSpy2,
  }));

const createQueryBuilderForAddUserFriendSpy = jest
  .fn()
  .mockImplementation(() => ({
    innerJoinAndSelect: innerJoinAndSelectForForAddUserFriendSpy1,
  }));

// .createQueryBuilder('user_friends')
// .innerJoinAndSelect('user_friends.friend', 'friend')
// .innerJoinAndSelect('user_friends.user', 'user')
// .where('user.id = :userId', { userId: userFriendRequest.userId })
// .andWhere('friend.id = :friendId', {
//   friendId: userFriendRequest.friendId,
// })
// .orWhere('user.id = :friendId', {
//   friendId: userFriendRequest.friendId,
// })
// .andWhere('friend.id = :userId', { userId: userFriendRequest.userId })
// .getMany();

class UsersFriendsRepositoryMock {
  private queryBuilderSpy: any;

  public setQueryBuilderSpy(spy: jest.SpyInstance): void {
    this.queryBuilderSpy = spy;
  }

  public create(entityLike: DeepPartial<UserFriends>): UserFriends {
    return dbUserFriendsMock;
  }
  public async save(entity: User): Promise<UserFriends> {
    return of(dbUserFriendsMock).toPromise();
  }

  public async findOne(id: string): Promise<UserFriends> {
    return of(dbUserFriendsMock).toPromise();
  }

  public async update(
    criteria: string,
    partialEntity: Partial<UserFriends>,
  ): Promise<UpdateResult> {
    return of(updateResultMock).toPromise();
  }

  public async find(
    options?: FindManyOptions<UserFriends>,
  ): Promise<Array<UserFriends>> {
    return of([dbUserFriendsMock]).toPromise();
  }

  public async delete(id: number): Promise<DeleteResult> {
    return of(deleteMock).toPromise();
  }

  public createQueryBuilder(): any {
    return this.queryBuilderSpy();
  }
}

class UsersServiceMock {
  public async add(user: UserDTO): Promise<User> {
    return of(null).toPromise();
  }
  public async update(id: number, user: Partial<User>): Promise<User> {
    return of(null).toPromise();
  }
  public async findById(id: number): Promise<User> {
    return of(null).toPromise();
  }
  public async findByUsername(username: string): Promise<User> {
    return of(null).toPromise();
  }
  public async findBySimilarToUsername(username: string): Promise<Array<User>> {
    return of(null).toPromise();
  }
  public async findAll(): Promise<Array<User>> {
    return of(null).toPromise();
  }
  public delete(id: number): Promise<DeleteResult> {
    return of(null).toPromise();
  }
}

describe('UserFriendsService', () => {
  let service: UserFriendsService;
  let usersFriendsRepository: Repository<UserFriends>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
        {
          provide: getRepositoryToken(UserFriends),
          useClass: UsersFriendsRepositoryMock,
        },
        UserFriendsService,
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersFriendsRepository = module.get<Repository<UserFriends>>(
      getRepositoryToken(UserFriends),
    );
    service = module.get<UserFriendsService>(UserFriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add friend request', async () => {
    const usersMocks = [userMock1, userMock2];
    let i = 0;
    ((usersFriendsRepository as unknown) as UsersFriendsRepositoryMock).setQueryBuilderSpy(
      createQueryBuilderForAddUserFriendSpy,
    );
    jest
      .spyOn(usersService, 'findById')
      .mockImplementation(() => of(usersMocks[i++]).toPromise());
    const addSpy = jest.spyOn(usersFriendsRepository, 'create');
    const saveSpy = jest.spyOn(usersFriendsRepository, 'save');

    await service.add(userFriendsMock);

    expect(addSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should find friend by record id', async () => {
    const findOneSpy = jest.spyOn(usersFriendsRepository, 'findOne');

    await service.findById(1);

    expect(findOneSpy).toHaveBeenCalled();
  });

  it('should update existing record', async () => {
    const findOneSpy = jest
      .spyOn(usersFriendsRepository, 'findOne')
      .mockImplementation(() => of(dbUserFriendsMock).toPromise());
    const saveSpy = jest.spyOn(usersFriendsRepository, 'save');

    await service.update(1);

    expect(findOneSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should find all user friends by user id', async () => {
    ((usersFriendsRepository as unknown) as UsersFriendsRepositoryMock).setQueryBuilderSpy(
      createQueryBuilderForFindByUserIdSpy,
    );
    const id = 1;
    const findById = jest
      .spyOn(usersService, 'findById')
      .mockReturnValue(of(userMock1).toPromise());

    await service.findByUserId(id);

    expect(findById).toHaveBeenCalledWith(id);
  });

  it('should find all users', async () => {
    const findSpy = jest
      .spyOn(usersFriendsRepository, 'find')
      .mockReturnValue(of([dbUserFriendsMock]).toPromise());

    await service.findAll();

    expect(findSpy).toBeCalled();
  });

  it('should delete user', async () => {
    const findOneSpy = jest
      .spyOn(usersFriendsRepository, 'findOne')
      .mockReturnValue(of(dbUserFriendsMock).toPromise());
    const deleteSpy = jest
      .spyOn(usersFriendsRepository, 'delete')
      .mockReturnValue(of(deleteMock).toPromise());

    const deleteResult = await service.delete(1);

    expect(findOneSpy).toBeCalled();
    expect(deleteSpy).toBeCalled();
    expect(deleteResult).toBeTruthy();
  });
});
