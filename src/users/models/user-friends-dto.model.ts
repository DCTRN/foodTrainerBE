import { IsInt } from 'class-validator';

export class UserFriendsDTO {
  @IsInt()
  userId: number;

  @IsInt()
  friendId: number;
}
