import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationExistsException extends HttpException {
  constructor() {
    super('Conversation Already Exists', HttpStatus.CONFLICT);
  }
}
