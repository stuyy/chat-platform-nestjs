import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Participant } from './Participant';

@Entity({ name: 'conversations' })
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Participant, (participant) => participant.conversations)
  participants: Participant[];
}
