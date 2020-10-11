import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { UserFriendsDTO } from './models/user-friends-dto.model';
import { UserFriends } from './models/user-friends.model';
import { UserfrienWithUserData } from './models/userfriend-with-user-data.model';
import { UserFriendsHandlerService } from './services/user-friends-handler.service';
import { UserFriendsController } from './user-friends.controller';

const friendRequestMock: UserFriendsDTO = {
  userId: 1,
  friendId: 2,
};

@Injectable()
export class UserFriendsHandlerServiceMock {
  public async getAllUserFriendsByUserIs(
    userId: number,
  ): Promise<Array<UserfrienWithUserData>> {
    return of(null).toPromise();
  }

  public async sendFriendRequest(
    friendRequest: UserFriendsDTO,
  ): Promise<UserFriends> {
    return of(null).toPromise();
  }

  public async acceptFriendRequest(
    friendRequestId: number,
  ): Promise<UserFriends> {
    return of(null).toPromise();
  }
}

describe('UserFriends Controller', () => {
  let controller: UserFriendsController;
  let userFriendsHandlerService: UserFriendsHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserFriendsHandlerService,
          useClass: UserFriendsHandlerServiceMock,
        },
      ],
      controllers: [UserFriendsController],
    }).compile();

    userFriendsHandlerService = module.get<UserFriendsHandlerService>(
      UserFriendsHandlerService,
    );
    controller = module.get<UserFriendsController>(UserFriendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all user friends for given user id', async () => {
    const getAllUserFriendsSpy = spyOn(
      userFriendsHandlerService,
      'getAllUserFriendsByUserIs',
    );

    await controller.getAllUserFriends(1);

    expect(getAllUserFriendsSpy).toHaveBeenCalled();
  });

  it('should send friend request', async () => {
    const sendFriendRequestSpy = spyOn(
      userFriendsHandlerService,
      'sendFriendRequest',
    );

    await controller.sendFriendRequest(friendRequestMock);

    expect(sendFriendRequestSpy).toHaveBeenCalled();
  });

  it('should accept friend request', async () => {
    const acceptFriendRequestSpy = spyOn(
      userFriendsHandlerService,
      'acceptFriendRequest',
    );

    await controller.acceptFriendRequest(1);

    expect(acceptFriendRequestSpy).toHaveBeenCalled();
  });
});
