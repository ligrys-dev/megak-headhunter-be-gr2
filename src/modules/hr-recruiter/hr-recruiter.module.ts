import { Module } from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';
import { HrRecruiterController } from './hr-recruiter.controller';

@Module({
  controllers: [HrRecruiterController],
  providers: [HrRecruiterService],
})
export class HrRecruiterModule {}
