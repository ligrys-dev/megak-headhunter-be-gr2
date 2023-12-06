import { User } from 'src/modules/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { StudentProfile } from './student-profile.entity';
import { Profile } from 'passport';

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

  @OneToOne(() => StudentProfile, (profile) => profile.id)
  @JoinColumn()
  profile: Profile;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  [key: string]: any;
}
