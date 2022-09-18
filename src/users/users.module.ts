import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageStorageModule } from '../image-storage/image-storage.module';
import { Services } from '../utils/constants';
import { Peer, Profile, User, UserPresence } from '../utils/typeorm';
import { UserPresenceController } from './controllers/user-presence.controller';
import { UserProfilesController } from './controllers/user-profile.controller';
import { UsersController } from './controllers/user.controller';
import { UserPresenceService } from './services/user-presence.service';
import { UserProfileService } from './services/user-profile.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPresence, Peer, Profile]),
    ImageStorageModule,
  ],
  controllers: [
    UsersController,
    UserProfilesController,
    UserPresenceController,
  ],
  providers: [
    {
      provide: Services.USERS,
      useClass: UserService,
    },
    {
      provide: Services.USERS_PROFILES,
      useClass: UserProfileService,
    },
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
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
    {
      provide: Services.USER_PRESENCE,
      useClass: UserPresenceService,
    },
  ],
})
export class UsersModule {}
