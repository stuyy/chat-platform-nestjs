import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupOwnerTransferException extends HttpException {
  constructor(msg?: string) {
    const defaultMessage = 'Group Owner Transfer Exception';
    const errorMessage = msg
      ? defaultMessage.concat(': ', msg)
      : defaultMessage;
    super(errorMessage, HttpStatus.BAD_REQUEST);
  }
}
