import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { Services } from '../../utils/constants';
import { AuthenticatedRequest } from '../../utils/types';
import { GroupNotFoundException } from '../exceptions/GroupNotFound';
import { InvalidGroupException } from '../exceptions/InvalidGroup';
import { IGroupService } from '../interfaces/group';

@Injectable()
export class GroupMiddleware implements NestMiddleware {
  constructor(
    @Inject(Services.GROUPS)
    private readonly groupService: IGroupService,
  ) {}

  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { id: userId } = req.user;
    const id = parseInt(req.params.id);

    if (isNaN(id)) throw new InvalidGroupException();
    const params = { id, userId };
    const user = await this.groupService.hasAccess(params);
    console.log(user);
    if (user) next();
    else throw new GroupNotFoundException();
  }
}
