import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotFoundException } from '../users/exceptions/UserNotFound';
import { IUserService } from '../users/user';
import { Services } from '../utils/constants';
import { FriendRequest } from '../utils/typeorm';
import { Friend } from '../utils/typeorm/entities/Friend';
import {
  CancelFriendRequestParams,
  CreateFriendParams,
  FriendRequestParams,
} from '../utils/types';
import { FriendRequestException } from './exceptions/FriendRequest';
import { FriendRequestAcceptedException } from './exceptions/FriendRequestAccepted';
import { FriendRequestNotFoundException } from './exceptions/FriendRequestNotFound';
import { FriendRequestPending } from './exceptions/FriendRequestPending';
import { IFriendRequestService } from './friend-requests';

@Injectable()
export class FriendRequestService implements IFriendRequestService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {}

  getFriendRequests(id: number): Promise<FriendRequest[]> {
    const status = 'pending';
    return this.friendRequestRepository.find({
      where: [
        { sender: { id }, status },
        { receiver: { id }, status },
      ],
      relations: ['receiver', 'sender'],
    });
  }

  async cancel({ id, userId }: CancelFriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.sender.id !== userId) throw new FriendRequestException();
    return this.friendRequestRepository.delete(id);
  }

  async create({ user: sender, email }: CreateFriendParams) {
    const receiver = await this.userService.findUser({ email });
    if (!receiver) throw new UserNotFoundException();
    const exists = await this.isPending(sender.id, receiver.id);
    if (exists) throw new FriendRequestPending();
    const friend = this.friendRequestRepository.create({
      sender,
      receiver,
      status: 'pending',
    });
    return this.friendRequestRepository.save(friend);
  }

  async accept({ id, userId }: FriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.status === 'accepted')
      throw new FriendRequestAcceptedException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();
    friendRequest.status = 'accepted';
    await this.friendRequestRepository.save(friendRequest);
    const newFriend = this.friendRepository.create({
      sender: friendRequest.sender,
      receiver: friendRequest.receiver,
    });
    return this.friendRepository.save(newFriend);
  }

  async reject({ id, userId }: CancelFriendRequestParams) {
    const friendRequest = await this.findById(id);
    if (!friendRequest) throw new FriendRequestNotFoundException();
    if (friendRequest.status === 'accepted')
      throw new FriendRequestAcceptedException();
    if (friendRequest.receiver.id !== userId)
      throw new FriendRequestException();
    friendRequest.status = 'rejected';
    return this.friendRequestRepository.save(friendRequest);
  }

  isPending(userOneId: number, userTwoId: number) {
    return this.friendRequestRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
          status: 'pending',
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'pending',
        },
      ],
    });
  }

  isFriends(userOneId: number, userTwoId: number) {
    return this.friendRequestRepository.findOne({
      where: [
        {
          sender: { id: userOneId },
          receiver: { id: userTwoId },
          status: 'accepted',
        },
        {
          sender: { id: userTwoId },
          receiver: { id: userOneId },
          status: 'accepted',
        },
      ],
    });
  }

  findById(id: number): Promise<FriendRequest> {
    return this.friendRequestRepository.findOne(id, {
      relations: ['receiver', 'sender'],
    });
  }
}
