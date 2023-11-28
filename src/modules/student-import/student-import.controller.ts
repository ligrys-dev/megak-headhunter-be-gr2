import {
  Controller,
  Post,
  Redirect,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StudentImportService } from './student-import.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/student-import')
export class StudentImportController {
  constructor(private readonly studentImportService: StudentImportService) {}

  @Post('/upload/')
  @Redirect('/user/students')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.studentImportService.parseFile(file);
  }
}
