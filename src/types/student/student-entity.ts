import { StudentStatus, TypeWork, ContractType } from './enums';
import { StudentInitial } from '../../modules/student/entities/student-initial.entity';

export interface StudentInitialEntity {
  email: string;
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  bonusProjectUrls: string[];
}

export interface StudentProfileEntity {
  id: string;
  initialData: StudentInitial | null;
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

export type GetOneStudentProfileResponse = StudentProfileEntity;
