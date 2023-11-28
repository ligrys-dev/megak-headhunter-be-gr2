import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StudentInitialEntity extends BaseEntity {
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
}
