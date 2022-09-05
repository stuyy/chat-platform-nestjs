import {
  AddGroupRecipientParams,
  RemoveGroupRecipientParams,
} from '../../utils/types';

export interface IGroupRecipientService {
  addGroupRecipient(params: AddGroupRecipientParams);
  removeGroupRecipient(params: RemoveGroupRecipientParams);
}
