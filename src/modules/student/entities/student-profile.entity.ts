import { ContractType, StudentStatus, TypeWork } from 'src/types';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentInitialEntity } from './student-initial.entity';

@Entity()
export class StudentProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'boolean', default: false, nullable: false })
  canTakeApprenticeship: boolean;

  @Column({ type: 'int', precision: 3, default: 0 })
  monthsOfCommercialExp: number;

  @Column({ type: 'text', nullable: true })
  education: string | null;

  @Column({ type: 'text', nullable: true })
  workExperience: string | null;

  @Column({ type: 'text', nullable: true })
  courses: string | null;

  @Column({ type: 'enum', enum: StudentStatus, default: 0 })
  status: StudentStatus;

  @OneToOne(() => StudentInitialEntity, (initial) => initial.email)
  @JoinColumn()
  initialData: StudentInitialEntity;
}
