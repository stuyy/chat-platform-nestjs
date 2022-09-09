import { Module } from '@nestjs/common';
import { GatewayModule } from '../gateway/gateway.module';
import { FriendRequestsEvents } from './friend-requests.events';

@Module({
  imports: [GatewayModule],
  providers: [FriendRequestsEvents],
})
export class EventsModule {}
