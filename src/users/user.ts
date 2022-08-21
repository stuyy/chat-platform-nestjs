import { CreateUserDetails } from '../utils/types';

export interface IUserService {
  createUser(userDetails: CreateUserDetails);
}
