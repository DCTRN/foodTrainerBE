import { UserWithoutSensitiveData } from '../user/user-without-sensitive-data';

export interface UserfriendWithoutSensitiveData {
  id: number;
  friend: UserWithoutSensitiveData;
  isAccepted: boolean;
  friendshipRequesterId: number;
  friendshipRequestDate: Date;
  friendshipAcceptDate: Date;
}
