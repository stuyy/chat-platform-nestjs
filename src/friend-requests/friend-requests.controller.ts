import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { CreateFriendDto } from './dtos/CreateFriend.dto';
import { IFriendRequestService } from './friend-requests';

@Controller(Routes.FRIEND_REQUESTS)
export class FriendRequestController {
  constructor(
    @Inject(Services.FRIENDS_REQUESTS_SERVICE)
    private readonly friendRequestService: IFriendRequestService,
  ) {}

  @Get()
  getFriendRequests(@AuthUser() user: User) {
    return this.friendRequestService.getFriendRequests(user.id);
  }

  @Post()
  createFriendRequest(
    @AuthUser() user: User,
    @Body() { email }: CreateFriendDto,
  ) {
    const params = { user, email };
    return this.friendRequestService.create(params);
  }

  @Patch(':id/accept')
  acceptFriendRequest(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendRequestService.accept({ id, userId });
  }
}
