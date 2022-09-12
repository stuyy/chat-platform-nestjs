import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IImageStorage } from '../../image-storage/image-storage';
import { Services } from '../../utils/constants';
import { generateUUIDV4 } from '../../utils/helpers';
import { Profile, User } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';
import { IUserProfile } from '../interfaces/user-profile';

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(Services.IMAGE_UPLOAD_SERVICE)
    private readonly imageStorageService: IImageStorage,
  ) {}

  createProfile() {
    const newProfile = this.profileRepository.create();
    return this.profileRepository.save(newProfile);
  }

  async updateProfile(user: User, params: UpdateUserProfileParams) {
    console.log('Update Profile');
    console.log(params);
    if (user.profile) {
      const key = await this.updateProfileBanner(params);
      user.profile.banner = key;
      await this.profileRepository.save(user.profile);
      return this.userRepository.save(user);
    }
    const key = await this.updateProfileBanner(params);
    user.profile = await this.createProfile();
    user.profile.banner = key;
    return this.userRepository.save(user);
  }

  async updateProfileBanner(params: UpdateUserProfileParams) {
    if (params.banner) {
      const key = generateUUIDV4();
      await this.imageStorageService.uploadBanner({
        key,
        file: params.banner,
      });
      return key;
    }
  }
}
