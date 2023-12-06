import { StudentStatus, TypeWork, ContractType } from './enums';

export interface StudentInitialInterface {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
}

export type ListOfStudentInitialResponse = StudentInitialInterface[];
export type OneStudentInitialResponse = StudentInitialInterface;

export interface StudentProfileInterface {
  id: string;
  initialData: StudentInitialInterface;
  tel?: string;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls?: string[];
  projectUrls: string[];
  bio: string;
  expectedTypeWork: TypeWork;
  targetWorkCity: string;
  expectedContractType: ContractType;
  expectedSalary?: number;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education?: string;
  workExperience?: string;
  courses?: string;
  status: StudentStatus;
}

export type NewStudentProfileInterface = Omit<StudentProfileInterface, 'id'>;

export type ListOfStudentProfilesResponse = StudentProfileInterface[];
export type OneStudentProfileResponse = StudentProfileInterface;
