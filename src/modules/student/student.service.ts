import { Injectable } from '@nestjs/common';
import { CreateStudentProfileDto } from './dto/create-studentProfile.dto';
import { UpdateStudentProfileDto } from './dto/update-studentProfile.dto';
import { StudentProfile } from './entities/student-profile.entity';
import {
  GetOneStudentProfileResponse,
  ListOfStudentProfilesResponse,
  StudentProfileEntity,
} from 'src/types';
import { v4 as uuid } from 'uuid';

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

  async create(
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
