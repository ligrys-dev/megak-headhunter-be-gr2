import { Test, TestingModule } from '@nestjs/testing';
import { HrRecruiterImportService } from './hr-recruiter-import.service';

describe('HrRecruiterImportService', () => {
  let service: HrRecruiterImportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrRecruiterImportService],
    }).compile();

    service = module.get<HrRecruiterImportService>(HrRecruiterImportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
