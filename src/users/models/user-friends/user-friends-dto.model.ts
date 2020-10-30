import { IsInt, Min } from 'class-validator';

export class UserFriendsDTO {
  @IsInt()
  @Min(1)
  userId: number;

  @IsInt()
  @Min(1)
  friendId: number;
}
