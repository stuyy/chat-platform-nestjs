import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IImageStorage } from '../../image-storage/image-storage';
import { Services } from '../../utils/constants';
import { generateUUIDV4 } from '../../utils/helpers';
import { Profile } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';
import { IUserProfile } from '../interfaces/user-profile';

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @Inject(Services.IMAGE_UPLOAD_SERVICE)
    private readonly imageStorageService: IImageStorage,
  ) {}

  findProfile() {
    throw new Error('Method not implemented.');
  }

  async updateProfile(params: UpdateUserProfileParams) {
    console.log('Update Profile');
    console.log(params);
    if (params.banner) {
      const key = generateUUIDV4();
      await this.imageStorageService.uploadBanner({ key, file: params.banner });
    }
    if (params.avatar) {
      this.imageStorageService.uploadProfilePicture();
    }
    if (params.about) {
    }
  }
}
