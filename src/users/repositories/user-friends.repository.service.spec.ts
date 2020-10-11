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
import { IUserFriends } from '../models/user-friends.interface';
import { UserFriends } from '../models/user-friends.model';
import { User } from '../models/user.model';
import { UserFriendsService } from './user-friends.repository.service';

const dbUserFriendsMock: UserFriends = {
  id: 1,
  user: null,
  friend: null,
  isAccepted: false,
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

class UsersFriendsRepositoryMock {
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
}

describe('UserFriendsService', () => {
  let service: UserFriendsService;
  let usersFriendsRepository: Repository<UserFriends>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFriendsService,
        {
          provide: getRepositoryToken(UserFriends),
          useClass: UsersFriendsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserFriendsService>(UserFriendsService);
    usersFriendsRepository = module.get<Repository<UserFriends>>(
      getRepositoryToken(UserFriends),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add friend request', async () => {
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
    const findOneSpy = jest.spyOn(usersFriendsRepository, 'findOne');
    const updateSpy = jest.spyOn(usersFriendsRepository, 'update');

    await service.update(1, userFriendsMock);

    expect(findOneSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should find all user friends by user id', async () => {
    const findSpy = jest
      .spyOn(usersFriendsRepository, 'find')
      .mockReturnValue(of([dbUserFriendsMock]).toPromise());

    await service.findByUserId(1);

    expect(findSpy).toHaveBeenCalled();
  });

  it('should find all users', async () => {
    const findSpy = jest
      .spyOn(usersFriendsRepository, 'find')
      .mockReturnValue(of([dbUserFriendsMock]).toPromise());

    await service.findAll();

    expect(findSpy).toBeCalled();
  });

  it('should delete user', async () => {
    const deleteSpy = jest
      .spyOn(usersFriendsRepository, 'delete')
      .mockReturnValue(of(deleteMock).toPromise());

    const deleteResult = await service.delete(1);

    expect(deleteSpy).toBeCalled();
    expect(deleteResult).toBeTruthy();
  });
});
