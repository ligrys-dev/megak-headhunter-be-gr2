import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  findAll() {
    return Student.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
