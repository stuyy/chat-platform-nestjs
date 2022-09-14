import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotCreateMessageException extends HttpException {
  constructor() {
    super('Cannot Create Message', HttpStatus.BAD_REQUEST);
  }
}
