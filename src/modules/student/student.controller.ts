import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import { StudentOrderByOptions } from 'src/types/student/enums/studentOrderByOptions';
import { StudentFilterOptions } from 'src/types/student/enums/studentFilterOptions';
// import { CreateStudentInitialDto } from './dto/create-student-initial.dto';

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  // zostawmy tą metodę zakomentowaną tutaj na razie do testowania
  // @Post('/initial')
  // initiateProfile(@Body() initialProfile: CreateStudentInitialDto) {
  //   return this.studentService.createInitialProfile(initialProfile);
  // }

  @Get()
  findAllProfiles() {
    return this.studentService.findAllProfiles();
  }

  @Get('/initial')
  findAllInitialProfile() {
    return this.studentService.findAllInitialProfile();
  }

  // ten endpoint nie będzie chyba potrzebny, ale na razie może tu zostać
  // @Get('/initial/:email')
  // findOneInitialProfile(@Param('email') email: string) {
  //   return this.studentService.findOneInitialProfile(email);
  // }

  // @Get('/:id')
  // findOneProfile(@Param('id') id: string) {
  //   return this.studentService.findOneProfile(id);
  // }

  @Post()
  createProfile(@Body() studentDto: CreateStudentProfileDto) {
    return this.studentService.createStudentProfile(studentDto);
  }

  @Patch('/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentProfileDto,
  ) {
    return this.studentService.updateStudentProfile(id, updateStudentDto);
  }

  @Get('/avaliable/:skip?/:take?')
  filterStudents(
    @Param('skip') skip: unknown,
    @Param('take') take: unknown,
    @Query('orderBy') orderBy: StudentOrderByOptions,
    @Query('filters') filters: { [key in StudentFilterOptions]: number },
  ) {
    // const filters = {
    //   courseCompletion: 2,
    //   projectDegree: 5,
    //   'profile.expectedContractType': ContractType.CONTRACT,
    //   githubUsername: 'foobar',
    // };

    return this.studentService.filterStudents(
      skip as number,
      take as number,
      orderBy,
      filters,
    );
  }
}
