import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserService } from '../users/user';
import { Services } from '../utils/constants';
import { Group } from '../utils/typeorm';
import { CreateGroupParams, FetchGroupsParams } from '../utils/types';
import { IGroupService } from './group';

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  async createGroup(params: CreateGroupParams) {
    const { creator, title } = params;
    const usersPromise = params.users.map((email) =>
      this.userService.findUser({ email }),
    );
    const users = (await Promise.all(usersPromise)).filter((user) => user);
    users.push(creator);
    console.log(users);
    const group = this.groupRepository.create({ users, creator, title });
    return this.groupRepository.save(group);
  }

  getGroups(params: FetchGroupsParams): Promise<Group[]> {
    return this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.users', 'user')
      .where('user.id IN (:users)', { users: [params.userId] })
      .getMany();
  }
}
