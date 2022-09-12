import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';
import { IUserProfile } from '../interfaces/user-profile';

@Injectable()
export class UserProfileService implements IUserProfile {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  findProfile() {
    throw new Error('Method not implemented.');
  }

  updateProfile(params: UpdateUserProfileParams) {}
}
