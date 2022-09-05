import { Group } from '../../utils/typeorm';
import {
  AddGroupRecipientParams,
  AddGroupUserResponse,
  RemoveGroupRecipientParams,
  RemoveGroupUserResponse,
} from '../../utils/types';

export interface IGroupRecipientService {
  addGroupRecipient(
    params: AddGroupRecipientParams,
  ): Promise<AddGroupUserResponse>;
  removeGroupRecipient(
    params: RemoveGroupRecipientParams,
  ): Promise<RemoveGroupUserResponse>;
}
