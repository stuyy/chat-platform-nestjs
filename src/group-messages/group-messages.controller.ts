import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateMessageDto } from '../messages/dtos/CreateMessage.dto';
import { Routes, Services } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { IGroupMessageService } from './group-messages';

@Controller(Routes.GROUP_MESSAGES)
export class GroupMessageController {
  constructor(
    @Inject(Services.GROUP_MESSAGES)
    private readonly groupMessageService: IGroupMessageService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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
  async getGroupMessages(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(`Fetching GroupMessages for Group Id: ${id}`);
    const messages = await this.groupMessageService.getGroupMessages(id);
    return { id, messages };
  }

  @Delete(':messageId')
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
}
