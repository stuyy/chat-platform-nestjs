import { Module } from '@nestjs/common';
import { MessagingGateway } from './websocket.gateway';

@Module({
  providers: [MessagingGateway],
})
export class GatewayModule {}
