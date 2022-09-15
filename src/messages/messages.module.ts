import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationsModule } from '../conversations/conversations.module';
import { FriendsModule } from '../friends/friends.module';
import { ImageStorageModule } from '../image-storage/image-storage.module';
import { MessageAttachmentsModule } from '../message-attachments/message-attachments.module';
import { Services } from '../utils/constants';
import { Conversation, Message } from '../utils/typeorm';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Conversation]),
    ImageStorageModule,
    MessageAttachmentsModule,
    ConversationsModule,
    FriendsModule,
  ],
  controllers: [MessageController],
  providers: [
    {
      provide: Services.MESSAGES,
      useClass: MessageService,
    },
  ],
})
export class MessagesModule {}
