import { UserWithoutSensitiveData } from './user-without-sensitive-data';

export interface UserfrienWithUserData {
  userFriendId: number;
  friend: UserWithoutSensitiveData;
  isAccepted: boolean;
}
