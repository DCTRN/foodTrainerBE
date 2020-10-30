import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { UserDTO } from '../models/user/user-dto.model';
import { UserFriendsDTO } from '../models/user-friends/user-friends-dto.model';
import { IUserFriends } from '../models/user-friends/user-friends.interface';
import { UserFriends } from '../models/user-friends/user-friends.model';
import { User } from '../models/user.model';
import { UserFriendsService } from '../repositories/user-friends.repository.service';
import { UsersService } from '../repositories/users.service';
import { UserFriendsHandlerService } from './user-friends-handler.service';

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

const friendMock1: User = {
  id: 2,
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

const friendMock2: User = {
  id: 3,
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

const userFriendsMock: UserFriends[] = [
  {
    id: 1,
    user: userMock,
    friend: friendMock1,
    isAccepted: true,
  },
  {
    id: 2,
    user: userMock,
    friend: friendMock2,
    isAccepted: true,
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

@Injectable()
export class UsersServiceMock {
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

  public async findAll(): Promise<Array<User>> {
    return of(null).toPromise();
  }

  public delete(id: number): Promise<DeleteResult> {
    return of(null).toPromise();
  }
}

describe('UserFriendsHandlerService', () => {
  let service: UserFriendsHandlerService;
  let userFriendsService: UserFriendsService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserFriendsHandlerService,
        {
          provide: UserFriendsService,
          useClass: UserFriendsServiceMock,
        },
        {
          provide: UsersService,
          useClass: UsersServiceMock,
        },
      ],
    }).compile();

    service = module.get<UserFriendsHandlerService>(UserFriendsHandlerService);
    userFriendsService = module.get<UserFriendsService>(UserFriendsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all friends data for given user id ', async () => {
    const findUserFriendsByUserIdSpy = jest
      .spyOn(userFriendsService, 'findByUserId')
      .mockReturnValue(of(userFriendsMock).toPromise());

    jest
      .spyOn(usersService, 'findById')
      .mockReturnValue(of(friendMock1).toPromise());

    const userFriends = await service.getAllUserFriendsByUserIds(1);

    expect(findUserFriendsByUserIdSpy).toHaveBeenCalled();
    expect(userFriends).toBeTruthy();
    expect(userFriends.length).toEqual(2);
    console.log(userFriends);
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
