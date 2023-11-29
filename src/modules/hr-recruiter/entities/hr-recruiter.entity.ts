import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recruiter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, length: 55 })
  fullname: string;

  @Column({ nullable: false, length: 55 })
  company: string;

  @Column({ type: 'smallint' })
  maxReservedStudents: number;

  [key: string]: unknown;
}
