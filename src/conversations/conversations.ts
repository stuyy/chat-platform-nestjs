import { CreateConversationParams } from '../utils/types';

export interface IConversationsService {
  createConversation(conversationParams: CreateConversationParams);
}
