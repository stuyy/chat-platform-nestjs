import { Injectable } from '@nestjs/common';
import { CreateConversationParams } from '../utils/types';
import { IConversationsService } from './conversations';

@Injectable()
export class ConversationsService implements IConversationsService {
  createConversation(params: CreateConversationParams) {}
}
