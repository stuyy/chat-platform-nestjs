import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseMessage } from './BaseMessage';
import { Group } from './Group';
import { GroupMessageAttachment } from './GroupMessageAttachment';
import { MessageAttachment } from './MessageAttachment';

@Entity({ name: 'group_messages' })
export class GroupMessage extends BaseMessage {
  @ManyToOne(() => Group, (group) => group.messages)
  group: Group;

  @OneToMany(() => GroupMessageAttachment, (attachment) => attachment.message)
  @JoinColumn()
  attachments?: MessageAttachment[];
}
