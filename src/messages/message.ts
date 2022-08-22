import { Message } from '../utils/typeorm';
import { CreateMessageParams } from '../utils/types';

export interface IMessageService {
  createMessage(params: CreateMessageParams): Promise<Message>;
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
}
