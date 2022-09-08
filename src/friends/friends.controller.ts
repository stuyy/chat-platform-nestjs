import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { CreateFriendDto } from './dtos/CreateFriend.dto';
import { IFriendsService } from './friends';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}

  @Post()
  createFriend(@AuthUser() user: User, @Body() { email }: CreateFriendDto) {
    const params = { user, email };
    return this.friendsService.createFriendRequest(params);
  }
}
