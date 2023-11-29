import { Test, TestingModule } from '@nestjs/testing';
import { HrRecruiterService } from './hr-recruiter.service';

describe('HrRecruiterService', () => {
  let service: HrRecruiterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrRecruiterService],
    }).compile();

    service = module.get<HrRecruiterService>(HrRecruiterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
