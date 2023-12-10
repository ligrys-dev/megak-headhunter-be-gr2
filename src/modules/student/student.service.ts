import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { CreateStudentInitialDto } from './dto/create-student-initial.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { StudentProfile } from './entities/student-profile.entity';
import { StudentInitial } from './entities/student-initial.entity';
import { InvalidDataFormatException } from '../../common/exceptions/invalid-data-format.exception';
import {
  StudentStatus,
  StudentFilters,
  StudentOrderByOptions,
  UserType,
} from 'src/types';

@Injectable()
export class StudentService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async findOneInitialProfile(email: string) {
    return StudentInitial.findOneOrFail({
      where: { email },
    });
  }

  async findOneProfile(id: string) {
    return StudentProfile.findOneOrFail({
      where: { id },
      relations: ['initialData'],
    });
  }

  async createStudentProfile(createStudentDto: CreateStudentProfileDto) {
    const newStudent: CreateStudentProfileDto = new StudentProfile();

    Object.keys(createStudentDto).forEach((prop) => {
      newStudent[prop] = createStudentDto[prop];
    });

    const checkGitHubUsername = await fetch(
      `https://api.github.com/users/${newStudent.githubUsername}`,
    );
    const res = await checkGitHubUsername.json();

    if (res.message === 'Not Found' && newStudent.githubUsername !== '') {
      throw new InvalidDataFormatException('GitHub username does not exist');
    }

    const githubUsernameAlreadyUsed = await this.findByGithubUsername(
      newStudent.githubUsername,
    );

    if (
      githubUsernameAlreadyUsed.length > 0 &&
      newStudent.githubUsername !== ''
    ) {
      throw new InvalidDataFormatException(
        'GitHub username already used on this website',
      );
    }

    await newStudent.save();
    return newStudent;
  }

  async createInitialProfile(initialProfile: CreateStudentInitialDto) {
    const newInitialProfile = new StudentInitial();

    Object.keys(initialProfile).forEach((prop) => {
      newInitialProfile[prop] = initialProfile[prop];
    });

    newInitialProfile.status = StudentStatus.AVAILABLE;

    await newInitialProfile.save();
    return newInitialProfile;
  }

  async updateStudentProfile(
    id: string,
    updateStudentDto: UpdateStudentProfileDto,
  ) {
    const updatingStudent: UpdateStudentProfileDto =
      await this.findOneProfile(id);

    Object.keys(updateStudentDto).forEach((prop) => {
      updatingStudent[prop] = updateStudentDto[prop];
    });

    await updatingStudent.save();
    return StudentProfile.findOneOrFail({
      where: {
        id: updatingStudent.id,
      },
    });
  }

  async findByGithubUsername(githubUsername: string) {
    return StudentProfile.find({
      where: {
        githubUsername,
      },
    });
  }

  async findAllReservedStudentsForRecruiter(recruiterId: string) {
    return await StudentInitial.find({
      where: {
        recruiter: { recruiterId },
      },
      relations: ['profile'],
    });
  }

  async findAllReservedStudents() {
    return await StudentInitial.find({
      where: {
        status: `${StudentStatus.CONVERSATION}` as unknown as number,
      },
    });
  }

  async filterAndSortStudents(
    page: number = 1,
    take: number = 10,
    status: StudentStatus = StudentStatus.AVAILABLE,
    orderBy: StudentOrderByOptions,
    filters: StudentFilters,
    recruiterUserId: string,
  ) {
    const { recruiter } = (await this.userService.getSelf(
      recruiterUserId,
    )) as UserType;

    const queryBuilder = StudentInitial.createQueryBuilder('student')
      .innerJoinAndSelect('student.profile', 'profile')
      .where(`status = "${status}"`);

    if (status === StudentStatus.CONVERSATION) {
      queryBuilder.andWhere(`recruiter = "${recruiter.id}"`);
    }

    if (filters) {
      Object.keys(filters).forEach((filterKey) => {
        const value = `"${filters[filterKey]}"`;
        queryBuilder.andWhere(`${filterKey} = ${value}`);
      });
    }

    const [students, studentsCount] = await queryBuilder
      .orderBy(orderBy ?? null, 'DESC')
      .skip((page - 1) * take)
      .take(take)
      .getManyAndCount();

    const numberOfPages = Math.ceil(studentsCount / take);

    return { students, studentsCount, numberOfPages };
  }

  async markEmployed(studentUserId: string) {
    const { student } = (await this.userService.getSelf(
      studentUserId,
    )) as UserType;

    student.status = StudentStatus.HIRED;
    return await student.save();
  }
}
