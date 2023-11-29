import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDto } from './dto/create-studentProfile.dto';
import { UpdateStudentProfileDto } from './dto/update-studentProfile.dto';
import { CreateStudentInitialDto } from './dto/create-studentInitial.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAllProfiles() {
    return this.studentService.findAllProfiles();
  }

  @Get('/initial')
  findAllInitialProfile() {
    return this.studentService.findAllInitialProfile();
  }

  @Get('initial/:email')
  findOneInitialProfile(@Param('email') email: string) {
    return this.studentService.findOneInitialProfile(email);
  }

  @Get(':id')
  findOneProfile(@Param('id') id: string) {
    return this.studentService.findOneProfile(id);
  }

  @Post()
  createProfile(@Body() StudentDto: CreateStudentProfileDto) {
    return this.studentService.createStudentProfile(StudentDto);
  }

  @Post('/initial')
  initiateProfile(@Body() initialProfile: CreateStudentInitialDto) {
    return this.studentService.createInitialProfile(initialProfile);
  }

  @Patch(':id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentProfileDto,
  ) {
    return this.studentService.updateStudentProfile(id, updateStudentDto);
  }
}
