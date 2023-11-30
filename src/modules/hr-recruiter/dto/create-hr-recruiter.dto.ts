import { NewRecruiterEntity } from 'src/types';

export class CreateHrRecruiterDto implements NewRecruiterEntity {
  email: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}
