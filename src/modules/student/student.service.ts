import { Injectable } from '@nestjs/common';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { StudentProfile } from './entities/student-profile.entity';
import { StudentInitial } from './entities/student-initial.entity';
import {
  StudentStatus,
  ListOfStudentInitialResponse,
  OneStudentInitialResponse,
  ListOfStudentProfilesResponse,
  OneStudentProfileResponse,
} from 'src/types';
import { CreateStudentInitialDto } from './dto/create-student-initial.dto';
import { InvalidDataFormatException } from '../../common/exceptions/invalid-data-format.exception';
import { StudentOrderByOptions } from 'src/types/student/enums/studentOrderByOptions';

@Injectable()
export class StudentService {
  async findAllInitialProfile(): Promise<ListOfStudentInitialResponse> {
    return StudentInitial.find();
  }

  async findOneInitialProfile(
    email: string,
  ): Promise<OneStudentInitialResponse> {
    return StudentInitial.findOneOrFail({
      where: { email },
    });
  }

  async findAllProfiles(): Promise<ListOfStudentProfilesResponse> {
    return StudentProfile.find({
      relations: ['initialData'],
    });
  }

  async findOneProfile(id: string): Promise<OneStudentProfileResponse> {
    return StudentProfile.findOneOrFail({
      where: { id },
      relations: ['initialData'],
    });
  }

  async createStudentProfile(
    createStudentDto: CreateStudentProfileDto,
  ): Promise<OneStudentProfileResponse> {
    const newStudent: CreateStudentProfileDto = new StudentProfile();

    Object.keys(createStudentDto).forEach((prop) => {
      newStudent[prop] = createStudentDto[prop];
    });
    newStudent.status = StudentStatus.AVAILABLE;

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

  async createInitialProfile(
    initialProfile: CreateStudentInitialDto,
  ): Promise<OneStudentInitialResponse> {
    const newInitialProfile: CreateStudentInitialDto = new StudentInitial();

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
  ): Promise<OneStudentProfileResponse> {
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

  async findByGithubUsername(
    githubUsername: string,
  ): Promise<ListOfStudentProfilesResponse> {
    return StudentProfile.find({
      where: {
        githubUsername,
      },
    });
  }

  async filterStudents(
    skip: number = 1,
    take: number = 10,
    orderBy: StudentOrderByOptions,
    filters: any,
  ) {
    const queryBuilder = StudentInitial.createQueryBuilder('student')
      .innerJoinAndSelect('student.profile', 'profile')
      .where(`status = "${StudentStatus.AVAILABLE}"`);

    Object.keys(filters).forEach((filterKey) => {
      const value = filters[filterKey];
      queryBuilder.andWhere(`${filterKey} = ${value}`);
    });

    const [students, studentsCount] = await queryBuilder
      .orderBy(orderBy ?? null, 'DESC')
      .skip((skip - 1) * take)
      .take(take)
      .getManyAndCount();

    const numberOfPages = Math.ceil(studentsCount / take);

    return { students, studentsCount, numberOfPages };
  }
}
