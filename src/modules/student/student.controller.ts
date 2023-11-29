import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDto } from './dto/create-studentProfile.dto';
import { UpdateStudentProfileDto } from './dto/update-studentProfile.dto';
import { CreateStudentInitialDto } from './dto/create-studentInitial.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Post()
  createProfile(@Body() StudentDto: CreateStudentProfileDto) {
    return this.studentService.createProfile(StudentDto);
  }

  @Post('/initial')
  createInitialProfile(@Body() initialProfile: CreateStudentInitialDto) {
    return this.studentService.createInitialProfile(initialProfile);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentProfileDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }
}
