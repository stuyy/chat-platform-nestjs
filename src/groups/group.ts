import { Group } from '../utils/typeorm';
import { CreateGroupParams, FetchGroupsParams } from '../utils/types';

export interface IGroupService {
  createGroup(params: CreateGroupParams);
  getGroups(params: FetchGroupsParams): Promise<Group[]>;
  getGroupById(id: number): Promise<Group>;
}
