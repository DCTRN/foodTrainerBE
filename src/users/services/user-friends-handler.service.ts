import { Injectable } from '@nestjs/common';
import { UserDataConverter } from 'src/core/utils/user-data-converter';
import { UserFriendsDTO } from '../models/user-friends-dto.model';
import { IUserFriends } from '../models/user-friends.interface';
import { UserFriends } from '../models/user-friends.model';
import { UserWithoutSensitiveData } from '../models/user-without-sensitive-data';
import { User } from '../models/user.model';
import { UserfrienWithUserData } from '../models/userfriend-with-user-data.model';
import { UserFriendsService } from '../repositories/user-friends.repository.service';
import { UsersService } from '../repositories/users.service';

@Injectable()
export class UserFriendsHandlerService {
  private userDataConverter = new UserDataConverter();
  constructor(
    private userFriendsService: UserFriendsService,
    private usersService: UsersService,
  ) {}

  public async getAllUserFriendsByUserIs(
    userId: number,
  ): Promise<Array<UserfrienWithUserData>> {
    const userFriendsData: Array<User> = [];
    const userFriends = await this.getUserFriends(userId);
    await this.getUserFriendsData(userFriends, userFriendsData);
    const friendsWithoutSensitiveData = this.trimUserFriendsSensitiveData(
      userFriendsData,
    );
    return friendsWithoutSensitiveData.map(
      (f: UserWithoutSensitiveData, index: number) =>
        (({
          ...f,
          userFriendId: userFriends[index].id,
          isAccepted: userFriends[index].isAccepted,
        } as unknown) as UserfrienWithUserData),
    );
  }

  public async sendFriendRequest(
    friendRequest: UserFriendsDTO,
  ): Promise<UserFriends> {
    if (friendRequest.userId === friendRequest.friendId) {
      // TODO check whether it is sufficient
      throw new Error('Bad friend request');
    }
    return await this.userFriendsService.add({
      ...friendRequest,
      isAccepted: false,
    });
  }

  public async acceptFriendRequest(
    friendRequestId: number,
  ): Promise<UserFriends> {
    return await this.userFriendsService.update(friendRequestId, {
      isAccepted: true,
    });
  }

  private trimUserFriendsSensitiveData(
    userFriendsData: User[],
  ): UserWithoutSensitiveData[] {
    return this.userDataConverter.trimUsersSensitiveData(userFriendsData);
  }

  private async getUserFriendsData(
    userFriends: UserFriends[],
    userFriendsData: User[],
  ) {
    for (const userFriend of userFriends) {
      const friendsData = await this.usersService.findById(
        userFriend.friend.id,
      );
      userFriendsData.push(friendsData);
    }
  }

  private async getUserFriends(userId: number) {
    return await this.userFriendsService.findByUserId(userId);
  }
}
