import { UserWithoutSensitiveData } from '../user/user-without-sensitive-data';

export interface UserfriendsWithoutSensitiveData {
  id: number;
  isAccepted: boolean;
  friendshipRequesterId: number;
  friendshipRequestDate: Date;
  friendshipAcceptDate: Date;
  user: UserWithoutSensitiveData;
  friend: UserWithoutSensitiveData;
}
