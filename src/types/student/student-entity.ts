import { StudentStatus, TypeWork, ContractType } from './enums';

export interface StudentInitialEntity {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
}

export type ListOfStudentInitialResponse = StudentInitialEntity[];
export type OneStudentInitialResponse = StudentInitialEntity;

export interface StudentProfileEntity {
  id: string;
  initialData: StudentInitialEntity | null;
  tel: string | null;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls: string[] | null;
  projectUrls: string[];
  bio: string;
  expectedTypeWork: TypeWork;
  targetWorkCity: string;
  expectedContractType: ContractType;
  expectedSalary: number | null;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string | null;
  workExperience: string | null;
  courses: string | null;
  status: StudentStatus;
}

export type ListOfStudentProfilesResponse = StudentProfileEntity[];
export type OneStudentProfileResponse = StudentProfileEntity;
