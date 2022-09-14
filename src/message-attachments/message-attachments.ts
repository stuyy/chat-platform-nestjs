import { MessageAttachment } from '../utils/typeorm';
import { Attachment } from '../utils/types';

export interface IMessageAttachmentsService {
  create(attachments: Attachment[]): Promise<MessageAttachment[]>;
}
