import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidGroupException extends HttpException {
  constructor() {
    super('Invalid Group Id', HttpStatus.BAD_REQUEST);
  }
}
