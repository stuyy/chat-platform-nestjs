import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';
import { IParticipantsService } from '../participants/participants';
import { IUserService } from '../users/user';
import { Services } from '../utils/constants';
import { Conversation, Participant, User } from '../utils/typeorm';
import { CreateConversationParams } from '../utils/types';
import { IConversationsService } from './conversations';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS)
    private readonly participantsService: IParticipantsService,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  findConversationByParticipants(participants: number[]) {
    console.log(participants);
    return this.conversationRepository
      .createQueryBuilder('conversations')
      .leftJoinAndSelect('conversations.participants', 'participants')
      .where('participants.id IN (:...participants)', { participants })
      .getOne();
  }

  async find(id: number) {
    // return this.participantsService.findParticipantConversations(id);
    const conversations = await this.conversationRepository
      .createQueryBuilder('conversations')
      .leftJoinAndSelect('conversations.participants', 'participants')
      .where('participants.id IN (:...participants)', { participants: [id] })
      .getMany();
    const promises = conversations.map((c) => {
      return this.conversationRepository
        .findOne(c.id, { relations: ['participants', 'participants.user'] })
        .then((conversationDB) => {
          console.log(conversationDB);
          const author = conversationDB.participants.find((p) => p.id === id);
          const recipient = conversationDB.participants.find(
            (p) => p.id !== id,
          );
          author.user = instanceToPlain(recipient.user) as User;
          recipient.user = instanceToPlain(recipient.user) as User;
          return { ...conversationDB, recipient };
        });
    });
    return Promise.all(promises);
  }

  async findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepository.findOne(id, {
      relations: ['participants', 'participants.user'],
    });
  }

  async createConversation(user: User, params: CreateConversationParams) {
    const userDB = await this.userService.findUser({ id: user.id });
    const { authorId, recipientId } = params;
    const participants: Participant[] = [];

    const participationIDs = [authorId, recipientId];

    const existingConvo = await this.findConversationByParticipants(
      participationIDs,
    );

    console.log(existingConvo);

    if (existingConvo)
      throw new HttpException('Conversation Exists', HttpStatus.CONFLICT);

    if (!userDB.participant) {
      const participant = await this.createParticipantAndSaveUser(
        userDB,
        authorId,
      );
      participants.push(participant);
    } else participants.push(userDB.participant);

    const recipient = await this.userService.findUser({ id: recipientId });
    if (!recipient)
      throw new HttpException('Recipient Not Found', HttpStatus.BAD_REQUEST);

    if (!recipient.participant) {
      const participant = await this.createParticipantAndSaveUser(
        recipient,
        recipientId,
      );
      participants.push(participant);
    } else participants.push(recipient.participant);

    const conversation = this.conversationRepository.create({
      participants,
    });
    return this.conversationRepository.save(conversation);
  }

  public async createParticipantAndSaveUser(user: User, id: number) {
    const participant = await this.participantsService.createParticipant({
      id,
    });
    user.participant = participant;
    await this.userService.saveUser(user);
    return participant;
  }
}
