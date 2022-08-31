import { Group } from '../utils/typeorm';
import { CreateGroupMessageParams } from '../utils/types';

export interface IGroupMessageService {
  createGroupMessage(params: CreateGroupMessageParams);
}
