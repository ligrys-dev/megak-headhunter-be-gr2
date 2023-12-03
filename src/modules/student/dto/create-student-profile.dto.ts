import {
  ContractType,
  StudentInitialInterface,
  StudentStatus,
  TypeWork,
} from 'src/types';
import {
  IsOptional,
  IsNotEmpty,
  ArrayNotEmpty,
  IsBoolean,
  IsString,
  IsNumber,
  IsArray,
  Length,
  MaxLength,
  Max,
  IsUrl,
  IsEmail,
} from 'class-validator';

export class CreateStudentProfileDto {
  id: string;

  @IsNotEmpty()
  @IsEmail()
  initialData: StudentInitialInterface;

  @IsOptional()
  @Length(9, 20)
  tel: string | null;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName: string;

  @MaxLength(39)
  @IsString()
  githubUsername: string;

  @IsOptional()
  @IsUrl({}, { each: true })
  @IsArray()
  portfolioUrls: string[] | null;

  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  @IsArray()
  projectUrls: string[];

  @IsOptional()
  @MaxLength(1500)
  bio: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(4)
  expectedTypeWork: TypeWork;

  @IsOptional()
  @MaxLength(50)
  targetWorkCity: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(3)
  expectedContractType: ContractType;

  @IsOptional()
  @IsNumber()
  @Max(99999999.99)
  expectedSalary: number | null;

  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsNumber()
  @Max(999)
  monthsOfCommercialExp: number;

  @IsOptional()
  @IsString()
  education: string | null;

  @IsOptional()
  @IsString()
  workExperience: string | null;

  @IsOptional()
  @IsString()
  courses: string | null;

  @IsOptional()
  @IsNumber()
  @Max(2)
  status: StudentStatus;

  [key: string]: any;
}
