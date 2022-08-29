import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [
    {
      provide: Services.GROUPS,
      useClass: GroupService,
    },
  ],
})
export class GroupModule {}
