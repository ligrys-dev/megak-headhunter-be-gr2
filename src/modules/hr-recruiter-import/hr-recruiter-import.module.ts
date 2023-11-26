import { Module } from '@nestjs/common';
import { HrRecruiterImportService } from './hr-recruiter-import.service';
import { HrRecruiterImportController } from './hr-recruiter-import.controller';

@Module({
  controllers: [HrRecruiterImportController],
  providers: [HrRecruiterImportService],
})
export class HrRecruiterImportModule {}
