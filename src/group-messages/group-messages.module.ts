import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from '../utils/constants';
import { Message } from '../utils/typeorm';
import { GroupMessageController } from './group-messages.controller';
import { GroupMessageService } from './group-messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [GroupMessageController],
  providers: [
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
  ],
})
export class GroupMessageModule {}
