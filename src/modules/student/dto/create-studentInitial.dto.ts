import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateStudentInitialDto {
  @IsEmail()
  email: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  bonusProjectUrls: string[];

  [key: string]: any;
}
