import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateStudentDto } from './dto/create-user.dto';
import { Role } from 'src/types';
import { hashPwd } from 'src/utils/handle-pwd';

@Injectable()
export class UserService {
  async findOneByEmail(email: string) {
    return await User.findOneBy({ email });
  }

  async createStudents(createStudentDtos: CreateStudentDto[]) {
    try {
      for (const createStudentDto of createStudentDtos) {
        const { email, ...data } = createStudentDto;
        const user = new User();
        user.email = email;
        user.role = Role.STUDENT;
        user.pwdHash = await hashPwd('haslo do wygenerowania');

        await user.save();
        // const student = new Student()
        // for (const [key, value] of Object.entries(data)) {
        //   student[key] = value;
        // }
        // student.email = email
        // await student.save()
        console.log(data); //
      }
      return { ok: true };
    } catch (e) {
      throw new Error(e);
    }
  }
}
