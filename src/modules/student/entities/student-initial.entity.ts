import {
  BaseEntity,
  Column,
  Entity,
  // JoinColumn,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { StudentProfile } from './student-profile.entity';
// todo relacja

@Entity()
export class StudentInitial extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ nullable: false, unique: true }) // default length is 255
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

  // @OneToOne(() => StudentProfile, (profile) => profile.id)
  // @JoinColumn()
  // profile: StudentProfile;
}
