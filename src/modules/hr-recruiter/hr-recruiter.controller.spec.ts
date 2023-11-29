import { Test, TestingModule } from '@nestjs/testing';
import { HrRecruiterController } from './hr-recruiter.controller';
import { HrRecruiterService } from './hr-recruiter.service';

describe('HrRecruiterController', () => {
  let controller: HrRecruiterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrRecruiterController],
      providers: [HrRecruiterService],
    }).compile();

    controller = module.get<HrRecruiterController>(HrRecruiterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
