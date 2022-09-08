import { Friend } from '../utils/typeorm';

export interface IFriendsService {
  getFriends(id: number): Promise<Friend[]>;
}
