import { Injectable } from '@nestjs/common';
import { UserDataConverter } from 'src/core/utils/user-data-converter';
import { UserFriendsDTO } from '../models/user-friends/user-friends-dto.model';
import { UserFriends } from '../models/user-friends/user-friends.model';
import { UserWithoutSensitiveData } from '../models/user/user-without-sensitive-data';
import { User } from '../models/user/user.model';
import { UserfriendWithoutSensitiveData } from '../models/user-friends/user-friend-with-user-data.model';
import { UserFriendsService } from '../repositories/user-friends.repository.service';
import { UsersService } from '../repositories/users.service';
import { UserfriendsWithoutSensitiveData } from '../models/user-friends/user-friends-without-sensitive-data.model';
import { DeleteResult } from 'typeorm';

@Injectable()
export class UserFriendsHandlerService {
  private userDataConverter = new UserDataConverter();
  constructor(
    private userFriendsService: UserFriendsService,
    private usersService: UsersService,
  ) {}

  public async getAllUserFriendsByUserIds(
    userId: number,
  ): Promise<Array<UserfriendWithoutSensitiveData>> {
    const userFriendsData = await this.userFriendsService.findByUserId(userId);
    return userFriendsData.map((f: UserFriends) => {
      return {
        id: f.id,
        isAccepted: f.isAccepted,
        friend: this.userDataConverter.trimUserSensitiveData(
          this.getuserFriend(f, userId),
        ),
        friendshipRequesterId: f.friendshipRequesterId,
        friendshipRequestDate: f.friendshipRequestDate,
        friendshipAcceptDate: f.friendshipAcceptDate,
      };
    });
  }

  public async sendFriendRequest(
    friendRequest: UserFriendsDTO,
  ): Promise<UserfriendsWithoutSensitiveData> {
    if (friendRequest.userId === friendRequest.friendId) {
      throw new Error('Bad friend request');
    }
    const userFriends = await this.userFriendsService.add({
      ...friendRequest,
      isAccepted: false,
    });
    return {
      id: userFriends.id,
      isAccepted: userFriends.isAccepted,
      friend: this.userDataConverter.trimUserSensitiveData(userFriends.friend),
      user: this.userDataConverter.trimUserSensitiveData(userFriends.friend),
      friendshipRequesterId: userFriends.friendshipRequesterId,
      friendshipRequestDate: userFriends.friendshipRequestDate,
      friendshipAcceptDate: userFriends.friendshipAcceptDate,
    };
  }

  public async acceptFriendRequest(
    friendRequestId: number,
  ): Promise<UserfriendsWithoutSensitiveData> {
    const userFriends = await this.userFriendsService.update(friendRequestId);
    return {
      id: userFriends.id,
      isAccepted: userFriends.isAccepted,
      friend: this.userDataConverter.trimUserSensitiveData(userFriends.friend),
      user: this.userDataConverter.trimUserSensitiveData(userFriends.friend),
      friendshipRequesterId: userFriends.friendshipRequesterId,
      friendshipRequestDate: userFriends.friendshipRequestDate,
      friendshipAcceptDate: userFriends.friendshipAcceptDate,
    };
  }

  public async deleteUserFriend(userFriendsId: number): Promise<DeleteResult> {
    return await this.userFriendsService.delete(userFriendsId);
  }

  private getuserFriend(f: UserFriends, userId: number) {
    return Number(f.friend.id) === Number(userId) ? f.user : f.friend;
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
}
