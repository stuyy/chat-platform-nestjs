import { ValidateUserDetails } from '../utils/types';

export interface IAuthService {
  validateUser(userCredentials: ValidateUserDetails);
}
