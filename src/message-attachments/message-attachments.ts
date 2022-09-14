import { GroupMessageAttachment, MessageAttachment } from '../utils/typeorm';
import { Attachment } from '../utils/types';

export interface IMessageAttachmentsService {
  create(attachments: Attachment[]): Promise<MessageAttachment[]>;
  createGroupAttachments(
    attachments: Attachment[],
  ): Promise<GroupMessageAttachment[]>;
  deleteAllAttachments(attachments: MessageAttachment[]);
}
