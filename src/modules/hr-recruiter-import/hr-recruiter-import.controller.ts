import { Controller } from '@nestjs/common';
import { HrRecruiterImportService } from './hr-recruiter-import.service';

@Controller('hr-recruiter-import')
export class HrRecruiterImportController {
  constructor(private readonly hrRecruiterImportService: HrRecruiterImportService) {}
}
