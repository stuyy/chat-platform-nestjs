import { Entity, ManyToOne } from 'typeorm';
import { BaseMessage } from './BaseMessage';
import { Group } from './Group';

@Entity({ name: 'group_messages' })
export class GroupMessage extends BaseMessage {
  @ManyToOne(() => Group, (group) => group.messages)
  group: Group;
}
