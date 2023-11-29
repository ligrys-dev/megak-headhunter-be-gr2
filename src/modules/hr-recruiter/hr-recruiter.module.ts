import { Module } from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';
import { HrRecruiterController } from './hr-recruiter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './entities/hr-recruiter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruiter])],
  controllers: [HrRecruiterController],
  providers: [HrRecruiterService],
  exports: [HrRecruiterService],
})
export class HrRecruiterModule {}
