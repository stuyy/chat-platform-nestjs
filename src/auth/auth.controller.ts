import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { IUserService } from '../users/interfaces/user';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@swagger.ApiTags(Routes.AUTH)
@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  @swagger.ApiCreatedResponse({
    description: 'User created',
    type: CreateUserDto,
  })
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @swagger.ApiCreatedResponse({
    description: 'User logged in',
    type: CreateUserDto,
  })
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @Get('status')
  @swagger.ApiOkResponse()
  @UseGuards(AuthenticatedGuard)
  async status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user);
  }

  @Post('logout')
  @swagger.ApiOkResponse()
  logout() {
    return null;
  }
}
