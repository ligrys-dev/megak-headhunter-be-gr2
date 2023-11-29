import { NewRecruiterEntity } from 'src/types';

export class CreateHrRecruiterDto implements NewRecruiterEntity {
  id: number;
  email: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}
