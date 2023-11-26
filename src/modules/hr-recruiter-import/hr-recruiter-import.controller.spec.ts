import { Test, TestingModule } from '@nestjs/testing';
import { HrRecruiterImportController } from './hr-recruiter-import.controller';
import { HrRecruiterImportService } from './hr-recruiter-import.service';

describe('HrRecruiterImportController', () => {
  let controller: HrRecruiterImportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrRecruiterImportController],
      providers: [HrRecruiterImportService],
    }).compile();

    controller = module.get<HrRecruiterImportController>(HrRecruiterImportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
