import { User } from '../utils/typeorm';

export const mockUser = {
  id: 4444000455,
  email: 'test@test.com',
  firstName: 'Test',
  lastName: 'Test User',
  password: 'djiasdhjdgdhjasd',
  messages: [],
  groups: [],
} as User;
