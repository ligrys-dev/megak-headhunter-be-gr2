import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from 'src/common/mail/mail.module';
import { UserService } from './user.service';
import { HrRecruiterModule } from '../hr-recruiter/hr-recruiter.module';

@Module({
  imports: [
    MailModule,
    forwardRef(() => HrRecruiterModule),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
