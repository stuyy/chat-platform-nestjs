import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendRequestAcceptedException extends HttpException {
  constructor() {
    super('Friend Request Already Accepted', HttpStatus.BAD_REQUEST);
  }
}
