import { HttpException, HttpStatus } from '@nestjs/common';

export class NotGroupOwnerException extends HttpException {
  constructor() {
    super('Not a Group Owner', HttpStatus.BAD_REQUEST);
  }
}
