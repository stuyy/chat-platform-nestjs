import { UpdateUserProfileParams } from '../../utils/types';

export interface IUserProfile {
  findProfile();
  updateProfile(params: UpdateUserProfileParams);
}
