import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageStorageModule } from '../image-storage/image-storage.module';
import { Services } from '../utils/constants';
import { Profile, User } from '../utils/typeorm';
import { UserProfilesController } from './controllers/user-profile.controller';
import { UsersController } from './controllers/user.controller';
import { UserProfileService } from './services/user-profile.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), ImageStorageModule],
  controllers: [UsersController, UserProfilesController],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
  ],
})
export class UsersModule {}
