import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateStudentDto } from './dto/create-user.dto';
import { Role, UserWithRandomPwd as UserWithRandomPwd } from 'src/types';
import { hashPwd } from 'src/utils/handle-pwd';
import { generateRandomPwd } from 'src/utils/generate-random-pwd';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async findOneByEmail(email: string) {
    return await User.findOneBy({ email });
  }

  async createStudents(createStudentDtos: CreateStudentDto[]) {
    const createdUsers: UserWithRandomPwd[] = [];

    try {
      for (const createStudentDto of createStudentDtos) {
        const { email, ...data } = createStudentDto;
        const password = generateRandomPwd();

        const user = new User();
        user.email = email;
        user.role = Role.STUDENT;
        user.pwdHash = await hashPwd(password);
        const newUser = await user.save();

        createdUsers.push({ newUser, password });

        // const student = new Student()
        // for (const [key, value] of Object.entries(data)) {
        //   student[key] = value;
        // }
        // student.email = email
        // await student.save()
        console.log(data); // TODO to implement when student entitity will be implemented
      }
      return await this.cacheManager.set('users-to-activate', createdUsers);
    } catch (e) {
      throw new Error(e);
    }
  }
}
