import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendRequestException extends HttpException {
  constructor() {
    super('Cannot accept friend request', HttpStatus.BAD_REQUEST);
  }
}
