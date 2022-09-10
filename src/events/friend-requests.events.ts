import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from '../gateway/gateway';
import { FriendRequest } from '../utils/typeorm';

@Injectable()
export class FriendRequestsEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent('friendrequest.create')
  friendRequestCreate(payload: FriendRequest) {
    console.log('friendrequest.create');
    const receiverSocket = this.gateway.sessions.getUserSocket(
      payload.receiver.id,
    );
    receiverSocket && receiverSocket.emit('onFriendRequestReceived', payload);
  }

  @OnEvent('friendrequest.cancel')
  handleFriendRequestCancel(payload: FriendRequest) {
    console.log('friendrequest.cancel');
    const receiverSocket = this.gateway.sessions.getUserSocket(
      payload.receiver.id,
    );
    receiverSocket && receiverSocket.emit('onFriendRequestCancelled', payload);
  }
}
