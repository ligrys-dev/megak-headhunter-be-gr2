import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateStudentDto } from './dto/create-user.dto';
import { UserWithRandomPwd } from 'src/types';
import { UserService } from './user.service';
import { CreateHrRecruiterDto } from '../hr-recruiter/dto/create-hr-recruiter.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('/students')
  @Redirect('/user/sendActivationMail')
  async createStudentUsers() {
    const createStudentDtos: CreateStudentDto[] =
      await this.cacheManager.get('students');
    return this.userService.createStudents(createStudentDtos);
  }

  @Post('/recruiter')
  @Redirect('/user/sendActivationMail')
  createRecruiterUser(@Body() createRecruiterDto: CreateHrRecruiterDto) {
    return this.userService.createRecruiter(createRecruiterDto);
  }

  @Post('/sendActivationMail')
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
}
