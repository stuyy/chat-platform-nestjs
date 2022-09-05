import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Services } from '../utils/constants';
import { Group, GroupMessage } from '../utils/typeorm';
import { GroupMessageController } from './controllers/group-messages.controller';
import { GroupController } from './controllers/group.controller';
import { GroupMessageService } from './services/group-messages.service';
import { GroupService } from './services/group.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Group, GroupMessage])],
  controllers: [GroupController, GroupMessageController],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
    {
      provide: Services.GROUP_MESSAGES,
      useClass: GroupMessageService,
    },
  ],
  exports: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
  ],
})
export class GroupModule {}
