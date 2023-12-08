import { StudentStatus, TypeWork, ContractType } from './enums';

export interface StudentInitialInterface {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  status: StudentStatus;
  bonusProjectUrls: string[];
}

export type ListOfStudentInitialResponse = StudentInitialInterface[];
export type OneStudentInitialResponse = StudentInitialInterface;

export interface StudentProfileInterface {
  id: string;
  initialData: StudentInitialInterface | null;
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
}

export type NewStudentProfileInterface = Omit<StudentProfileInterface, 'id'>;

export type ListOfStudentProfilesResponse = StudentProfileInterface[];
export type OneStudentProfileResponse = StudentProfileInterface;
