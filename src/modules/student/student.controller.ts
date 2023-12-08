import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import {
  StudentFilters,
  StudentOrderByOptions,
  StudentStatus,
  UserFromReq,
} from 'src/types/';
import { Request } from 'express';
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

  @Post()
  createProfile(@Body() studentDto: CreateStudentProfileDto) {
    return this.studentService.createStudentProfile(studentDto);
  }

  @Get('/list/:status?/:page?/:take?/')
  filterStudents(
    @Req() req: Request,
    @Param('status') status: unknown,
    @Param('page') page: unknown,
    @Param('take') take: unknown,
    @Query('orderBy') orderBy: StudentOrderByOptions,
    @Query('filters') filters: string,
  ) {
    const decodedFilters: StudentFilters = JSON.parse(
      decodeURIComponent(filters ?? null),
    );

    return this.studentService.filterAndSortStudents(
      page as number,
      take as number,
      status as StudentStatus,
      orderBy,
      decodedFilters,
      (req.user as UserFromReq).userId,
    );
  }

  @Get('/:id')
  findOneProfile(@Param('id') id: string) {
    return this.studentService.findOneProfile(id);
  }

  @Patch('/hired')
  markEmplyed(@Req() req: Request) {
    return this.studentService.markEmployed((req.user as UserFromReq).userId);
  }

  @Patch('/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentProfileDto,
  ) {
    return this.studentService.updateStudentProfile(id, updateStudentDto);
  }
}
