import { StudentStatus, TypeWork, ContractType } from './enums';

export interface StudentEntity
  extends StudentInitialEntity,
    StudentProfileEntity {
  status: StudentStatus;
}

export interface StudentInitialEntity {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: number;
}

export interface StudentProfileEntity {
  id: string;
  email: string;
  tel: number | null;
  firstName: string;
  lastName: string;
  avatar: string | null;
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
}

export type NewStudentEntity = Omit<StudentProfileEntity, 'id'>;
