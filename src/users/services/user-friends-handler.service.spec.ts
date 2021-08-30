/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { user1, user2, user3 } from '@tests/users/mock-data.model';
import { of } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { UserFriendsDTO } from '../models/user-friends/user-friends-dto.model';
import { IUserFriends } from '../models/user-friends/user-friends.interface';
import { UserFriends } from '../models/user-friends/user-friends.model';
import { User } from '../models/user/user.model';
import { UserFriendsService } from '../repositories/user-friends.repository.service';
import { UserFriendsHandlerService } from './user-friends-handler.service';

const userMock: User = user1;
const friendMock1: User = user2;
const friendMock2: User = user3;

const userFriendsMock: UserFriends[] = [
  {
    id: 1,
    user: userMock,
    friend: friendMock1,
    isAccepted: true,
    friendshipRequesterId: 1,
    friendshipAcceptDate: null,
    friendshipRequestDate: null,
    createFriendshipAcceptDate: null,
  },
  {
    id: 2,
    user: userMock,
    friend: friendMock2,
    isAccepted: true,
    friendshipRequesterId: 1,
    friendshipAcceptDate: null,
    friendshipRequestDate: null,
    createFriendshipAcceptDate: null,
  },
];

const friendsRequest: UserFriendsDTO = {
  userId: 1,
  friendId: 2,
};

const badFriendsRequest: UserFriendsDTO = {
  userId: 1,
  friendId: 1,
};

@Injectable()
export class UserFriendsServiceMock {
  public async add(userFriendRequest: IUserFriends): Promise<UserFriends> {
    return of(null).toPromise();
  }

  public async update(
    id: number,
    userFriend: Partial<UserFriends>,
  ): Promise<UserFriends> {
    return of(null).toPromise();
  }

  public async findById(id: number): Promise<UserFriends> {
    return of(null).toPromise();
  }

  public async findByUserId(id: number): Promise<Array<UserFriends>> {
    return of(null).toPromise();
  }

  public async findAll(): Promise<Array<UserFriends>> {
    return of(null).toPromise();
  }

  public delete(id: number): Promise<DeleteResult> {
    return of(null).toPromise();
  }
}

describe('UserFriendsHandlerService', () => {
  let service: UserFriendsHandlerService;
  let userFriendsService: UserFriendsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFriendsHandlerService,
        {
          provide: UserFriendsService,
          useClass: UserFriendsServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserFriendsHandlerService>(UserFriendsHandlerService);
    userFriendsService = module.get<UserFriendsService>(UserFriendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all friends data for given user id ', async () => {
    const findUserFriendsByUserIdSpy = jest
      .spyOn(userFriendsService, 'findByUserId')
      .mockReturnValue(of(userFriendsMock).toPromise());

    const userFriends = await service.getAllUserFriendsByUserIds(1);

    expect(findUserFriendsByUserIdSpy).toHaveBeenCalled();
    expect(userFriends).toBeTruthy();
    expect(userFriends.length).toEqual(2);
  });

  it('should send friend request', async () => {
    const addUserFriendSpy = jest
      .spyOn(userFriendsService, 'add')
      .mockReturnValue(of(userFriendsMock[0]).toPromise());

    const userFriends = service.sendFriendRequest(friendsRequest);

    expect(addUserFriendSpy).toHaveBeenCalled();
    expect(userFriends).toBeTruthy();
  });

  it('should not send friend request if userId is equal friendId', async () => {
    const addUserFriendSpy = jest
      .spyOn(userFriendsService, 'add')
      .mockReturnValue(of(userFriendsMock[0]).toPromise());

    try {
      await service.sendFriendRequest(badFriendsRequest);
    } catch (error) {
      expect(error).toBeTruthy();
    }

    expect(addUserFriendSpy).not.toHaveBeenCalled();
  });

  it('should accept friend request', async () => {
    const updateUserFriendSpy = jest
      .spyOn(userFriendsService, 'update')
      .mockReturnValue(of(userFriendsMock[0]).toPromise());

    const userFriends = await service.acceptFriendRequest(1);

    expect(updateUserFriendSpy).toHaveBeenCalled();
    expect(userFriends).toBeTruthy();
  });
});
