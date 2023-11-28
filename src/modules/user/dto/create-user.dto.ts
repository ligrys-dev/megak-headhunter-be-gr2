import { NewUserEntity, Role, StudentInitialEntity } from 'src/types';

export class CreateStudentDto implements NewUserEntity, StudentInitialEntity {
  role?: Role = Role.STUDENT;
  isActive?: boolean = false;
  pwdHash: string;
  email: string;
  bonusProjectUrls: string[];
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
}
