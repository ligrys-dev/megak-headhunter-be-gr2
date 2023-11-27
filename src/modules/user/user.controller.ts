import { Controller, Inject, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreateStudentDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('/students')
  async createStudentUsers() {
    const createStudentDtos: CreateStudentDto[] =
      await this.cacheManager.get('students');
    return this.userService.createStudents(createStudentDtos);
  }
}
