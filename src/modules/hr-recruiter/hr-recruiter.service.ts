import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateHrRecruiterDto } from './dto/create-hr-recruiter.dto';
import { Recruiter } from './entities/hr-recruiter.entity';
import { StudentService } from '../student/student.service';
import { UserService } from '../user/user.service';
import { UserType } from 'src/types/user/user';
import { StudentStatus } from 'src/types';

@Injectable()
export class HrRecruiterService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private studentService: StudentService,
  ) {}

  async create(createHrRecruiterDto: CreateHrRecruiterDto) {
    const recruiter = new Recruiter();
    for (const [key, value] of Object.entries(createHrRecruiterDto)) {
      recruiter[key] = value;
    }

    return await recruiter.save();
  }

  async findAll() {
    return await Recruiter.find();
  }

  async findOne(id: string) {
    return await Recruiter.findOneByOrFail({ id });
  }

  async reserveStudent(studentEmail: string, recruiterUserId: string) {
    const student =
      await this.studentService.findOneInitialProfile(studentEmail);

    const { recruiter } = (await this.userService.getSelf(
      recruiterUserId,
    )) as UserType;

    if (student.status === StudentStatus.CONVERSATION)
      throw new Error('This student is not avaliable!');

    if (student.status === StudentStatus.HIRED)
      throw new Error('This student is already hired!');

    student.recruiter = recruiter;
    student.status = StudentStatus.CONVERSATION;
    student.reservationExpirationDate = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 10,
    );
    return await student.save();
  }

  async getAllReservedStudents(recruiterId: string) {
    return await this.studentService.findAllReservedStudents(recruiterId);
  }
}
