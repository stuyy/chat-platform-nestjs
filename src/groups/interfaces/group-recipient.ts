import { Group } from '../../utils/typeorm';
import {
  AddGroupRecipientParams,
  AddGroupUserResponse,
  RemoveGroupRecipientParams,
} from '../../utils/types';

export interface IGroupRecipientService {
  addGroupRecipient(
    params: AddGroupRecipientParams,
  ): Promise<AddGroupUserResponse>;
  removeGroupRecipient(params: RemoveGroupRecipientParams);
}
