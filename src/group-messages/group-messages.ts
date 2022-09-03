import { GroupMessage } from '../utils/typeorm';
import {
  CreateGroupMessageParams,
  DeleteGroupMessageParams,
} from '../utils/types';

export interface IGroupMessageService {
  createGroupMessage(params: CreateGroupMessageParams);
  getGroupMessages(id: number): Promise<GroupMessage[]>;
  deleteGroupMessage(params: DeleteGroupMessageParams);
}
