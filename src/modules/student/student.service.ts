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
} from 'src/types';
import { v4 as uuid } from 'uuid';
import { CreateStudentInitialDto } from './dto/create-studentInitial.dto';

@Injectable()
export class StudentService {
  async findAll(): Promise<ListOfStudentProfilesResponse> {
    return StudentProfile.find();
  }

  async findOne(id: string): Promise<GetOneStudentProfileResponse> {
    return StudentProfile.findOneOrFail({
      where: { id },
    });
  }

  async createProfile(
    createStudentDto: CreateStudentProfileDto,
  ): Promise<StudentProfileEntity> {
    const newStudent: CreateStudentProfileDto = new StudentProfile();
    newStudent.id = uuid();
    Object.keys(createStudentDto).forEach((prop) => {
      newStudent[prop] = createStudentDto[prop];
    });
    newStudent.status = 0;
    await newStudent.save();
    return newStudent;
  }

  async createInitialProfile(
    initialProfile: CreateStudentInitialDto,
  ): Promise<StudentInitialEntity> {
    const newInitialProfile: CreateStudentInitialDto = new StudentInitial();
    Object.keys(initialProfile).forEach((prop) => {
      newInitialProfile[prop] = initialProfile[prop];
    });
    await newInitialProfile.save();
    return newInitialProfile;
  }

  async update(
    id: string,
    updateStudentDto: UpdateStudentProfileDto,
  ): Promise<UpdateStudentProfileDto> {
    const updatingStudent: UpdateStudentProfileDto = await this.findOne(id);
    Object.keys(updateStudentDto).forEach((prop) => {
      updatingStudent[prop] = updateStudentDto[prop];
    });
    await updatingStudent.save();
    return updatingStudent;
  }
}
