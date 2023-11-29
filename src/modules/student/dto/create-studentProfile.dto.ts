import { ContractType, StudentStatus, TypeWork } from 'src/types';
import { StudentInitial } from '../entities/student-initial.entity';

export class CreateStudentProfileDto {
  id: string;
  initialData: StudentInitial;
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
  [key: string]: any;
}
