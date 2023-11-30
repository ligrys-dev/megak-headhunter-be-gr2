import { Injectable } from '@nestjs/common';
import { CreateStudentProfileDto } from './dto/create-studentProfile.dto';
import { UpdateStudentProfileDto } from './dto/update-studentProfile.dto';
import { StudentProfile } from './entities/student-profile.entity';
import { StudentInitial } from './entities/student-initial.entity';
import {
  GetOneStudentProfileResponse,
  ListOfStudentProfilesResponse,
  StudentInitialEntity,
  StudentProfileEntity,
  StudentStatus,
} from 'src/types';
import { CreateStudentInitialDto } from './dto/create-studentInitial.dto';
import { validate } from 'class-validator';

@Injectable()
export class StudentService {
  async findAllInitialProfile() {
    return StudentInitial.find();
  }

  async findOneInitialProfile(email: string) {
    return StudentInitial.findOneOrFail({
      where: { email },
    });
  }

  async findAllProfiles(): Promise<ListOfStudentProfilesResponse> {
    return StudentProfile.find({
      relations: ['initialData'],
    });
  }

  async findOneProfile(id: string): Promise<GetOneStudentProfileResponse> {
    return StudentProfile.findOneOrFail({
      where: { id },
      relations: ['initialData'],
    });
  }

  async createStudentProfile(
    createStudentDto: CreateStudentProfileDto,
  ): Promise<StudentProfileEntity> {
    const newStudent: CreateStudentProfileDto = new StudentProfile();

    Object.keys(createStudentDto).forEach((prop) => {
      newStudent[prop] = createStudentDto[prop];
    });
    newStudent.status = StudentStatus.AVAILABLE;

    await newStudent.save();
    return newStudent;
  }

  async createInitialProfile(
    initialProfile: CreateStudentInitialDto,
  ): Promise<StudentInitialEntity> {
    const errors = await validate(initialProfile);

    if (errors.length > 0) console.error('validation failed. errors: ', errors);

    const newInitialProfile: CreateStudentInitialDto = new StudentInitial();

    Object.keys(initialProfile).forEach((prop) => {
      newInitialProfile[prop] = initialProfile[prop];
    });

    await newInitialProfile.save();
    return newInitialProfile;
  }

  async updateStudentProfile(
    id: string,
    updateStudentDto: UpdateStudentProfileDto,
  ): Promise<UpdateStudentProfileDto> {
    const updatingStudent: UpdateStudentProfileDto =
      await this.findOneProfile(id);

    Object.keys(updateStudentDto).forEach((prop) => {
      updatingStudent[prop] = updateStudentDto[prop];
    });

    await updatingStudent.save();
    return updatingStudent;
  }
}
