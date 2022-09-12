import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Services } from '../../utils/constants';
import { IAuthService } from '../auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Services.AUTH) private readonly authService: IAuthService,
  ) {
    super();
  }

  async validate(username: string, password: string) {
    return this.authService.validateUser({ username, password });
  }
}
