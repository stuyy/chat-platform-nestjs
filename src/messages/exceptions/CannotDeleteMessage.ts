import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotDeleteMessage extends HttpException {
  constructor() {
    super('Cannot Delete Message', HttpStatus.BAD_REQUEST);
  }
}
