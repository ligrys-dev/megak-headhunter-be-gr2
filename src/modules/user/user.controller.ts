import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserFromReq, UserWithRandomPwd } from 'src/types';
import { UserService } from './user.service';
import { CreateHrRecruiterDto } from '../hr-recruiter/dto/create-hr-recruiter.dto';
import { Request } from 'express';
import { CreateStudentInitialDto } from '../student/dto/create-studentInitial.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/students')
  @Redirect('/user/sendActivationMail')
  async createStudentUsers() {
    const createStudentDtos: CreateStudentInitialDto[] =
      await this.cacheManager.get('students');
    return this.userService.createStudents(createStudentDtos);
  }

  @Post('/recruiter')
  @Redirect('/user/sendActivationMail')
  createRecruiterUser(@Body() createRecruiterDto: CreateHrRecruiterDto) {
    return this.userService.createRecruiter(createRecruiterDto);
  }

  @Get('/sendActivationMail')
  async sendActivationMail() {
    const users: UserWithRandomPwd[] =
      await this.cacheManager.get('users-to-activate');
    return this.userService.sendActivationMail(users);
  }

  @Get('/activate/:id/:activationToken')
  activateUser(
    @Param('id') id: string,
    @Param('activationToken') activationToken: string,
  ) {
    return this.userService.activateUser(id, activationToken);
  }

  @Patch('/change-pass')
  changePassword(
    @Req() req: Request,
    @Body('oldPwd') oldPwd: string,
    @Body('newPwd') newPwd: string,
  ) {
    return this.userService.changePassword(
      oldPwd,
      newPwd,
      req.user as UserFromReq,
    );
  }

  @Patch('/reset-pass')
  resetPassword(@Body('email') email: string) {
    return this.userService.resetPassword(email);
  }
}
