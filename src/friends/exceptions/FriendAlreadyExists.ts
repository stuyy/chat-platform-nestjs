import { HttpException, HttpStatus } from '@nestjs/common';

export class FriendAlreadyExists extends HttpException {
  constructor() {
    super('Friend Already Exists', HttpStatus.CONFLICT);
  }
}
