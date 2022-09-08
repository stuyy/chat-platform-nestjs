import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendRequestPending extends HttpException {
  constructor() {
    super('Friend Requesting Pending', HttpStatus.BAD_REQUEST);
  }
}
