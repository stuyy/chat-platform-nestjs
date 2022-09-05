import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupNotFoundException extends HttpException {
  constructor() {
    super('Group Not Found', HttpStatus.BAD_REQUEST);
  }
}
