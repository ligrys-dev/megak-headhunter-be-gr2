export interface RecruiterEntity {
  id: string;
  email: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}

export type NewRecruiterEntity = Omit<RecruiterEntity, 'id'>;
