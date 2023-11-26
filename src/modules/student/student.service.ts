import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import {
  GetOneStudentResponse,
  ListOfStudentsResponse,
  StudentEntity,
} from 'src/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  async findAll(): Promise<ListOfStudentsResponse> {
    return Student.find();
  }

  async findOne(id: string): Promise<GetOneStudentResponse> {
    return Student.findOneOrFail({
      where: { id },
    });
  }

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const newStudent: CreateStudentDto = new Student();
    newStudent.id = uuid();
    Object.keys(createStudentDto).forEach((prop) => {
      newStudent[prop] = createStudentDto[prop];
    });
    newStudent.status = 0;
    await newStudent.save();
    return newStudent;
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}
