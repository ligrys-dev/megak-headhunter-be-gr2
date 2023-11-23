import { Module } from '@nestjs/common';
import { StudentImportService } from './student-import.service';
import { StudentImportController } from './student-import.controller';

@Module({
  controllers: [StudentImportController],
  providers: [StudentImportService],
})
export class StudentImportModule {}
