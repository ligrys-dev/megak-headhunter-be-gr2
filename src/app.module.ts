import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { MailModule } from './common/mail/mail.module';
import { StudentImportModule } from './modules/student-import/student-import.module';
import { UserModule } from './modules/user/user.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    MailModule,
    StudentImportModule,
    UserModule,
    StudentModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
