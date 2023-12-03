import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentProfileEntity } from './entities/student-profile.entity';
import { StudentInitialEntity } from './entities/student-initial.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentProfileEntity, StudentInitialEntity]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
