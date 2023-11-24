import { StudentStatus, TypeWork, ContractType } from './enums';

export interface StudentEntity {
  id: string;
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
  bio: string;
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

export type StudentProfileEntity = Omit<
  StudentEntity,
  | 'courseCompletion'
  | 'courseEngagement'
  | 'projectDegree'
  | 'teamProjectDegree'
  | 'bonusProjectUrls'
  | 'status'
>;

export type NewStudentEntity = Omit<StudentEntity, 'id' | 'status'>;
