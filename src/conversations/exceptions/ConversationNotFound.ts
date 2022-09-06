import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationNotFoundException extends HttpException {
  constructor() {
    super('Conversation was not found', HttpStatus.NOT_FOUND);
  }
}
