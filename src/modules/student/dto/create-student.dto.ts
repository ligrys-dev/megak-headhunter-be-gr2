import { ContractType, NewStudentEntity, TypeWork } from 'src/types';

export class CreateStudentDto implements NewStudentEntity {
  avatar: string | null;
  bio: string;
  bonusProjectUrls: string[];
  canTakeApprenticeship: boolean;
  courseCompletion: number;
  courseEngagement: number;
  courses: string | null;
  education: string | null;
  email: string;
  expectedContractType: ContractType;
  expectedSalary: number | null;
  expectedTypeWork: TypeWork;
  firstName: string;
  githubUsername: string;
  lastName: string;
  monthsOfCommercialExp: number;
  portfolioUrls: string[];
  projectDegree: number;
  projectUrls: string[];
  targetWorkCity: string;
  teamProjectDegree: number;
  tel: string | null;
  workExperience: string | null;
}
