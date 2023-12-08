import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { StudentStatus } from 'src/types';
import { StudentProfile } from './student-profile.entity';

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

  @OneToOne(() => StudentProfile, (profile) => profile.id)
  @JoinColumn()
  profile: StudentProfile;

  [key: string]: any;

  @OneToOne(() => StudentProfile, (profile) => profile.id)
  @JoinColumn()
  profile: StudentProfile;
}
