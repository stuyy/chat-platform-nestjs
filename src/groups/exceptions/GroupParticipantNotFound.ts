import { HttpException, HttpStatus } from '@nestjs/common';

export class GroupParticipantNotFound extends HttpException {
  constructor() {
    super('Group Participant Not Found', HttpStatus.NOT_FOUND);
  }
}
