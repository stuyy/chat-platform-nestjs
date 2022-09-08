import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendRequestNotFoundException extends HttpException {
  constructor() {
    super('Friend Request not found', HttpStatus.BAD_REQUEST);
  }
}
