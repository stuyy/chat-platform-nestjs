import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from '../../utils/constants';
import { User, UserPresence } from '../../utils/typeorm';
import { UpdateStatusMessageParams } from '../../utils/types';
import { IUserService } from '../interfaces/user';
import { IUserPresenceService } from '../interfaces/user-presence';

@Injectable()
export class UserPresenceService implements IUserPresenceService {
  constructor(
    @InjectRepository(UserPresence)
    private readonly userPresenceRepository: Repository<UserPresence>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  createPresence(): Promise<UserPresence> {
    return this.userPresenceRepository.save(
      this.userPresenceRepository.create(),
    );
  }

  async updateStatus({
    user,
    statusMessage,
  }: UpdateStatusMessageParams): Promise<User> {
    console.log(user);
    if (!user.presence) {
      console.log('userDB.presence does not exist. creating');
      user.presence = await this.createPresence();
    }
    console.log('updating status...');
    user.presence.statusMessage = statusMessage;
    return this.userService.saveUser(user);
  }
}
