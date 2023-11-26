import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { GetOneStudentResponse, ListOfStudentsResponse } from 'src/types';

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

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}
