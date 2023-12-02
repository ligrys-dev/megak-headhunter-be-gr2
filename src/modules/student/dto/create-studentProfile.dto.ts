import {
  ContractType,
  StudentInitialEntity,
  StudentStatus,
  TypeWork,
} from 'src/types';
import {
  // IsArray,
  IsNotEmpty,
  // IsNumber,
  // IsUrl,
  Length,
  // Max,
  // Min,
  MaxLength,
} from 'class-validator';

export class CreateStudentProfileDto {
  id: string;
  initialData: StudentInitialEntity;

  @Length(9, 20)
  tel: string | null;

  @IsNotEmpty()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;

  @MaxLength(39)
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
