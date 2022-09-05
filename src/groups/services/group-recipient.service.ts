import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserService } from '../../users/user';
import { Services } from '../../utils/constants';
import { Group } from '../../utils/typeorm';
import {
  AddGroupRecipientParams,
  RemoveGroupRecipientParams,
} from '../../utils/types';
import { GroupNotFoundException } from '../exceptions/GroupNotFound';
import { NotGroupOwnerException } from '../exceptions/NotGroupOwner';
import { IGroupService } from '../interfaces/group';
import { IGroupRecipientService } from '../interfaces/group-recipient';

@Injectable()
export class GroupRecipientService implements IGroupRecipientService {
  constructor(
    @Inject(Services.USERS) private userService: IUserService,
    @Inject(Services.GROUPS) private groupService: IGroupService,
  ) {}
  async addGroupRecipient(params: AddGroupRecipientParams) {
    const group = await this.groupService.findGroupById(params.id);
    if (!group) throw new GroupNotFoundException();
    const recipient = await this.userService.findUser({ email: params.email });
    if (!recipient)
      throw new HttpException('Cannot Add User', HttpStatus.BAD_REQUEST);
    if (group.creator.id !== params.userId)
      throw new HttpException('Insufficient Permissions', HttpStatus.FORBIDDEN);
    const inGroup = group.users.find((user) => user.id === recipient.id);
    if (inGroup)
      throw new HttpException('User already in group', HttpStatus.BAD_REQUEST);
    group.users = [...group.users, recipient];
    const savedGroup = await this.groupService.saveGroup(group);
    return { group: savedGroup, user: recipient };
  }

  /**
   * Removes a Group Recipient as a Group Owner.
   * Does not allow users to leave the group.
   * @param params RemoveGroupRecipientParams
   * @returns Promise<Group>
   */
  async removeGroupRecipient(params: RemoveGroupRecipientParams) {
    const { issuerId, removeUserId, id } = params;
    const userToBeRemoved = await this.userService.findUser({
      id: removeUserId,
    });
    if (!userToBeRemoved)
      throw new HttpException('User cannot be removed', HttpStatus.BAD_REQUEST);
    const group = await this.groupService.findGroupById(id);
    if (!group) throw new GroupNotFoundException();
    // Not group owner
    if (group.creator.id !== issuerId) throw new NotGroupOwnerException();
    // Temporary
    if (group.creator.id === removeUserId)
      throw new HttpException(
        'Cannot remove yourself as owner',
        HttpStatus.BAD_REQUEST,
      );
    group.users = group.users.filter((u) => u.id !== removeUserId);
    const savedGroup = await this.groupService.saveGroup(group);
    return { group: savedGroup, user: userToBeRemoved };
  }
}
