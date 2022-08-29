import { Injectable } from '@nestjs/common';
import { IGroupService } from './group';

@Injectable()
export class GroupService implements IGroupService {
  createGroup() {}
}
