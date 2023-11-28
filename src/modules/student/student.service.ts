import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentProfile } from './entities/student-profile.entity';
import {
  GetOneStudentResponse,
  ListOfStudentsResponse,
  StudentEntity,
} from 'src/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  async findAll(): Promise<ListOfStudentsResponse> {
    return StudentProfile.find();
  }

  async findOne(id: string): Promise<GetOneStudentResponse> {
    return StudentProfile.findOneOrFail({
      where: { id },
    });
  }

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const newStudent: CreateStudentDto = new StudentProfile();
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
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    const updatingStudent: UpdateStudentDto = await this.findOne(id);
    Object.keys(updateStudentDto).forEach((prop) => {
      updatingStudent[prop] = updateStudentDto[prop];
    });
    await updatingStudent.save();
    return updatingStudent;
  }
}
