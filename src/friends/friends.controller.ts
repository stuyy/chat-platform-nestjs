import { Controller } from '@nestjs/common';
import { Routes, Services } from '../utils/constants';

@Controller(Routes.FRIENDS)
export class FriendsController {
  constructor() {}
}
