export interface RecruiterEntity {
  id: string;
  email: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}

export interface NewRecruiterEntity extends Omit<RecruiterEntity, 'id'> {}
