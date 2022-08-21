import { User } from '../utils/typeorm';
import { CreateConversationParams } from '../utils/types';

export interface IConversationsService {
  createConversation(user: User, conversationParams: CreateConversationParams);
}
