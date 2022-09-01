import { Group, GroupMessage } from '../utils/typeorm';
import { CreateGroupMessageParams } from '../utils/types';

export interface IGroupMessageService {
  createGroupMessage(params: CreateGroupMessageParams);
  getGroupMessages(id: number): Promise<GroupMessage[]>;
}
