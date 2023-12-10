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
  StudentFilters,
  StudentOrderByOptions,
  StudentStatus,
  UserFromReq,
} from 'src/types/';

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // po ustanowieniu relacji w bazach danych ten endpoint będzie chyba najważniejszy przy pobieraniu wszystkich danych pojedynczego studenta, trzeba się zastanowić czy nie zamienić adresu tego endpointu z adresem '/:id', który teraz służy do pobrania tylko danych profilowych.
  @Get('/initial/:email')
  findOneInitialProfile(@Param('email') email: string) {
    return this.studentService.findOneInitialProfile(email);
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
  markEmployed(@Req() req: Request) {
    return this.studentService.markEmployed((req.user as UserFromReq).userId);
  }

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
}
