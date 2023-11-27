import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateStudentDto } from './dto/create-user.dto';
import { Role } from 'src/types';
import { hashPwd } from 'src/utils/handle-pwd';
import { generateRandomPwd } from 'src/utils/generate-random-pwd';

@Injectable()
export class UserService {
  async findOneByEmail(email: string) {
    return await User.findOneBy({ email });
  }

  async createStudents(createStudentDtos: CreateStudentDto[]) {
    const createdUsers: { newUser: User; password: string }[] = [];

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
      return createdUsers;
    } catch (e) {
      throw new Error(e);
    }
  }
}
