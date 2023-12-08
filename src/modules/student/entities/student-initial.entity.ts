import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { StudentStatus } from 'src/types';
import { StudentProfile } from './student-profile.entity';
import { Recruiter } from 'src/modules/hr-recruiter/entities/hr-recruiter.entity';

@Entity()
export class StudentInitial extends BaseEntity {
  @PrimaryColumn()
  email: string;

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

  @Column({ type: 'date', nullable: true })
  reservationExpirationDate: Date;

  @OneToOne(() => StudentProfile, (profile) => profile.id)
  @JoinColumn()
  profile: StudentProfile;

  @ManyToOne(() => Recruiter, (recruiter) => recruiter.reservedStudents)
  recruiter: Recruiter;

  [key: string]: any;
}
