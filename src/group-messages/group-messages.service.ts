import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../utils/typeorm';
import { CreateGroupMessageParams } from '../utils/types';
import { IGroupMessageService } from './group-messages';

@Injectable()
export class GroupMessageService implements IGroupMessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  createGroupMessage(params: CreateGroupMessageParams) {
    this.messageRepository.create()
  }
}
