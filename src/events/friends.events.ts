import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MessagingGateway } from '../gateway/gateway';
import { ServerEvents } from '../utils/constants';
import { RemoveFriendEventPayload } from '../utils/types';

@Injectable()
export class FriendEvents {
  constructor(private readonly gateway: MessagingGateway) {}

  @OnEvent(ServerEvents.FRIEND_REMOVED)
  handleFriendRemoved({ userId, friend }: RemoveFriendEventPayload) {
    const { sender, receiver } = friend;
    console.log(ServerEvents.FRIEND_REMOVED);
    const socket = this.gateway.sessions.getUserSocket(
      receiver.id === userId ? sender.id : receiver.id,
    );
    console.log(`Emitting Event for ${socket?.user?.username}`);
    socket?.emit('onFriendRemoved', friend);
  }
}
