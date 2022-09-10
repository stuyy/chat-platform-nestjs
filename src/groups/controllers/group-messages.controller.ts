import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { CreateMessageDto } from '../../messages/dtos/CreateMessage.dto';
import { EditMessageDto } from '../../messages/dtos/EditMessage.dto';
import { Routes, Services } from '../../utils/constants';
import { AuthUser } from '../../utils/decorators';
import { User } from '../../utils/typeorm';
import { IGroupMessageService } from '../interfaces/group-messages';

@Controller(Routes.GROUP_MESSAGES)
export class GroupMessageController {
  constructor(
    @Inject(Services.GROUP_MESSAGES)
    private readonly groupMessageService: IGroupMessageService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Throttle(5, 10)
  @Post()
  async createGroupMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() { content }: CreateMessageDto,
  ) {
    console.log(`Creating Group Message for ${id}`);
    const response = await this.groupMessageService.createGroupMessage({
      author: user,
      groupId: id,
      content,
    });
    this.eventEmitter.emit('group.message.create', response);
    return;
  }

  @Get()
  @SkipThrottle()
  async getGroupMessages(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(`Fetching GroupMessages for Group Id: ${id}`);
    const messages = await this.groupMessageService.getGroupMessages(id);
    return { id, messages };
  }

  @Delete(':messageId')
  @SkipThrottle()
  async deleteGroupMessage(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
  ) {
    await this.groupMessageService.deleteGroupMessage({
      userId: user.id,
      groupId,
      messageId,
    });
    this.eventEmitter.emit('group.message.delete', {
      userId: user.id,
      messageId,
      groupId,
    });
    return { groupId, messageId };
  }

  @Patch(':messageId')
  @SkipThrottle()
  async editGroupMessage(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) groupId: number,
    @Param('messageId', ParseIntPipe) messageId: number,
    @Body() { content }: EditMessageDto,
  ) {
    const params = { userId, content, groupId, messageId };
    const message = await this.groupMessageService.editGroupMessage(params);
    this.eventEmitter.emit('group.message.update', message);
    return message;
  }
}
