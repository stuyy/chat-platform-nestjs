import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Inject,
  Delete,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SkipThrottle } from '@nestjs/throttler';
import { Routes, Services } from '../../utils/constants';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm';
import { AddGroupRecipientDto } from '../dtos/AddGroupRecipient.dto';
import { IGroupRecipientService } from '../interfaces/group-recipient';

@SkipThrottle()
@Controller(Routes.GROUP_RECIPIENTS)
export class GroupRecipientsController {
  constructor(
    @Inject(Services.GROUP_RECIPIENTS)
    private readonly groupRecipientService: IGroupRecipientService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async addGroupRecipient(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { username }: AddGroupRecipientDto,
  ) {
    const params = { id, userId, username };
    const response = await this.groupRecipientService.addGroupRecipient(params);
    this.eventEmitter.emit('group.user.add', response);
    return response;
  }

  /**
   * Leaves a Group
   * @param user the authenticated User
   * @param groupId the id of the group
   * @returns the updated Group that the user had left
   */
  @Delete('leave')
  async leaveGroup(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) groupId: number,
  ) {
    const group = await this.groupRecipientService.leaveGroup({
      id: groupId,
      userId: user.id,
    });
    this.eventEmitter.emit('group.user.leave', { group, userId: user.id });
    return group;
  }

  @Delete(':userId')
  async removeGroupRecipient(
    @AuthUser() { id: issuerId }: User,
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) removeUserId: number,
  ) {
    const params = { issuerId, id, removeUserId };
    const response = await this.groupRecipientService.removeGroupRecipient(
      params,
    );
    this.eventEmitter.emit('group.user.remove', response);
    return response.group;
  }
}
