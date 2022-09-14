import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageStorageModule } from '../image-storage/image-storage.module';
import { Services } from '../utils/constants';
import { GroupMessageAttachment, MessageAttachment } from '../utils/typeorm';
import { MessageAttachmentsService } from './message-attachments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageAttachment, GroupMessageAttachment]),
    ImageStorageModule,
  ],
  providers: [
    {
      provide: Services.MESSAGE_ATTACHMENTS,
      useClass: MessageAttachmentsService,
    },
  ],
  exports: [
    {
      provide: Services.MESSAGE_ATTACHMENTS,
      useClass: MessageAttachmentsService,
    },
  ],
})
export class MessageAttachmentsModule {}
