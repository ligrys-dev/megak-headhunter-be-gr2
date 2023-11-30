import { IsEmail, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { NewRecruiterEntity } from 'src/types';

export class CreateHrRecruiterDto implements NewRecruiterEntity {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  company: string;

  @IsInt()
  @Min(1)
  @Max(999)
  maxReservedStudents: number;
}
