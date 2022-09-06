import { Conversation, User } from '../utils/typeorm';
import {
  ConversationAccessParams,
  CreateConversationParams,
} from '../utils/types';

export interface IConversationsService {
  createConversation(
    user: User,
    conversationParams: CreateConversationParams,
  ): Promise<Conversation>;
  getConversations(id: number): Promise<Conversation[]>;
  findConversationById(id: number): Promise<Conversation | undefined>;
  hasAccess(params: ConversationAccessParams): Promise<boolean>;
}
