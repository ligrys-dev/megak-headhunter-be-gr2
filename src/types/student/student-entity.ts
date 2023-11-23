import { StudentStatus, TypeWork, ContractType } from './enums';

export interface StudentEntity {
  email: string;
  tel: number | null;
  firstName: string;
  lastName: string;
  avatar: string | null;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: number;
  githubUsername: string;
  portfolioUrls: string[];
  projectUrls: string[];
  expectedTypeWork: TypeWork;
  targetWorkCity: string;
  expectedContractType: ContractType;
  expectedSalary: number | null;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string | null;
  courses: string | null;
  status: StudentStatus;
}
