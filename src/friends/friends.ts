import { CreateFriendParams } from '../utils/types';

export interface IFriendsService {
  createFriendRequest(params: CreateFriendParams);
  isFriendRequestPending(userOneId: number, userTwoId: number);
  isFriends(userOneId: number, userTwoId: number);
}
