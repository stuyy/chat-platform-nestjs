import { GroupMessage } from '../../utils/typeorm';
import {
  CreateGroupMessageParams,
  DeleteGroupMessageParams,
  EditGroupMessageParams,
} from '../../utils/types';

export interface IGroupMessageService {
  createGroupMessage(params: CreateGroupMessageParams);
  getGroupMessages(id: number): Promise<GroupMessage[]>;
  deleteGroupMessage(params: DeleteGroupMessageParams);
  editGroupMessage(params: EditGroupMessageParams): Promise<GroupMessage>;
}
