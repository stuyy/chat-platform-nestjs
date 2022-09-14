import { HttpException, HttpStatus } from '@nestjs/common';

export class EmptyMessageException extends HttpException {
  constructor() {
    super(
      'Message must contain content or at least 1 attachment',
      HttpStatus.BAD_REQUEST,
    );
  }
}
