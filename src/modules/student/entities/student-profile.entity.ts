import { ContractType, StudentStatus, TypeWork } from 'src/types';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true }) // default length is 255
  email: string;

  @Column({ length: 20, nullable: true })
  tel: string | null;

  @Column({ length: 50, nullable: false })
  firstName: string;

  @Column({ length: 50, nullable: false })
  lastName: string;

  @Column({ length: 39, nullable: false })
  githubUsername: string;

  @Column('simple-array', { nullable: true })
  portfolioUrls: string[] | null;

  @Column('simple-array')
  projectUrls: string[];

  @Column({ length: 1500, nullable: false })
  bio: string;

  @Column({ type: 'enum', enum: TypeWork, nullable: false })
  expectedTypeWork: TypeWork;

  @Column({ length: 50, nullable: false })
  targetWorkCity: string;

  @Column({ type: 'enum', enum: ContractType, nullable: false })
  expectedContractType: ContractType;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: null })
  expectedSalary: number | null;

  @Column({ default: false, nullable: false })
  canTakeApprenticeship: boolean;

  @Column({ type: 'numeric', precision: 2, default: 0 })
  monthsOfCommercialExp: number;

  @Column({ type: 'text', nullable: true })
  education: string | null;

  @Column({ type: 'text', nullable: true })
  workExperience: string | null;

  @Column({ type: 'text', nullable: true })
  courses: string | null;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  courseCompletion: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  courseEngagement: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  projectDegree: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: false })
  teamProjectDegree: number;

  @Column('simple-array')
  bonusProjectUrls: string[];

  @Column({ type: 'enum', enum: StudentStatus, default: 0 })
  status: StudentStatus;
}
