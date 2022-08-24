import { Message } from '../utils/typeorm';
import { CreateMessageParams, CreateMessageResponse } from '../utils/types';

export interface IMessageService {
  createMessage(params: CreateMessageParams): Promise<CreateMessageResponse>;
  getMessagesByConversationId(conversationId: number): Promise<Message[]>;
}
