import { Group } from '../utils/typeorm';
import { CreateGroupParams } from '../utils/types';

export interface IGroupService {
  createGroup(params: CreateGroupParams);
}
