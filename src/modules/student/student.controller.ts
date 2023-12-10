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
import { Request } from 'express';
import { CreateStudentProfileDto } from './dto/create-student-profile.dto';
import { UpdateStudentProfileDto } from './dto/update-student-profile.dto';
import {
  Role,
  StudentFilters,
  StudentOrderByOptions,
  StudentStatus,
  UserFromReq,
} from 'src/types/';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // po ustanowieniu relacji w bazach danych ten endpoint będzie chyba najważniejszy przy pobieraniu wszystkich danych pojedynczego studenta, trzeba się zastanowić czy nie zamienić adresu tego endpointu z adresem '/:id', który teraz służy do pobrania tylko danych profilowych.
  @Roles(Role.HR)
  @Get('/initial/:email')
  findOneInitialProfile(@Param('email') email: string) {
    return this.studentService.findOneInitialProfile(email);
  }

  @Roles(Role.HR)
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

  @Roles(Role.HR)
  @Get('/:id')
  findOneProfile(@Param('id') id: string) {
    return this.studentService.findOneProfile(id);
  }

  @Roles(Role.STUDENT)
  @Patch('/hired')
  markEmployed(@Req() req: Request) {
    return this.studentService.markEmployed((req.user as UserFromReq).userId);
  }

  @Roles(Role.ADMIN)
  @Post()
  createProfile(@Body() studentDto: CreateStudentProfileDto) {
    return this.studentService.createStudentProfile(studentDto);
  }

  @Roles(Role.STUDENT)
  @Patch('/:id')
  updateProfile(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentProfileDto,
  ) {
    return this.studentService.updateStudentProfile(id, updateStudentDto);
  }
}
