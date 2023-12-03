import { Module } from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';
import { HrRecruiterController } from './hr-recruiter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruiterEntity } from './entities/hr-recruiter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecruiterEntity])],
  controllers: [HrRecruiterController],
  providers: [HrRecruiterService],
  exports: [HrRecruiterService],
})
export class HrRecruiterModule {}
