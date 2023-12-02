import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsNumber,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class CreateStudentInitialDto {
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

  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({}, { each: true })
  bonusProjectUrls: string[];

  [key: string]: any;
}
