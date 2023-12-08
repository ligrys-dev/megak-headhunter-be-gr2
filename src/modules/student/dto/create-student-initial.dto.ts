import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';
import { StudentInitialInterface, StudentStatus } from 'src/types';

export class CreateStudentInitialDto implements StudentInitialInterface {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsOptional()
  @IsNumber()
  @Max(2)
  status: StudentStatus;

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  bonusProjectUrls: string[];

  [key: string]: any;
}
