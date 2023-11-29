import { Controller, Get, Inject, Param, Redirect } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateStudentDto } from './dto/create-user.dto';
import { UserWithRandomPwd } from 'src/types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/students')
  @Redirect('/user/sendActivationMail')
  async createStudentUsers() {
    const createStudentDtos: CreateStudentDto[] =
      await this.cacheManager.get('students');
    return this.userService.createStudents(createStudentDtos);
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
}
