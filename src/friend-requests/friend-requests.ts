import { FriendRequest } from '../utils/typeorm';
import {
  CancelFriendRequestParams,
  CreateFriendParams,
  FriendRequestParams,
} from '../utils/types';

export interface IFriendRequestService {
  create(params: CreateFriendParams);
  cancel(params: CancelFriendRequestParams): Promise<FriendRequest>;
  reject(params: CancelFriendRequestParams);
  getFriendRequests(userId: number): Promise<FriendRequest[]>;
  isPending(userOneId: number, userTwoId: number);
  isFriends(userOneId: number, userTwoId: number);
  accept(params: FriendRequestParams);
  findById(id: number): Promise<FriendRequest>;
}
