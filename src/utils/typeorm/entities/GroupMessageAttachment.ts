import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { GroupMessage } from './GroupMessage';

@Entity({ name: 'group_message_attachments' })
export class GroupMessageAttachment {
  @PrimaryGeneratedColumn('uuid')
  key: string;

  @ManyToOne(() => GroupMessage, (message) => message.attachments, {
    onDelete: 'CASCADE',
  })
  message: GroupMessage;
}
