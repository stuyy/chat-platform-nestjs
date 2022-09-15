import { User, UserPresence } from '../../utils/typeorm';
import { UpdateStatusMessageParams } from '../../utils/types';

export interface IUserPresenceService {
  createPresence(): Promise<UserPresence>;
  updateStatus(params: UpdateStatusMessageParams): Promise<User>;
}
