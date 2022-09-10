import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { Routes, Services } from '../utils/constants';
import { AuthUser } from '../utils/decorators';
import { User } from '../utils/typeorm';
import { IFriendsService } from './friends';

@SkipThrottle()
@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor(
    @Inject(Services.FRIENDS_SERVICE)
    private readonly friendsService: IFriendsService,
  ) {}

  @Get()
  getFriends(@AuthUser() user: User) {
    console.log('Fetching Friends');
    return this.friendsService.getFriends(user.id);
  }

  @Delete(':id/delete')
  deleteFriend(
    @AuthUser() { id: userId }: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.friendsService.deleteFriend({ id, userId });
  }
}
