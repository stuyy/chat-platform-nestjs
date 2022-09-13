import { User } from '../../utils/typeorm';
import { UpdateUserProfileParams } from '../../utils/types';

export interface IUserProfile {
  createProfile();
  updateProfile(user: User, params: UpdateUserProfileParams);
  createProfileOrUpdate(user: User, params: UpdateUserProfileParams);
}
