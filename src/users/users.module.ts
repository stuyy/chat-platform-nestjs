import { Module } from '@nestjs/common';
import { Services } from '../utils/constants';
import { UserService } from './user.service';

@Module({
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
  ],
})
export class UsersModule {}
