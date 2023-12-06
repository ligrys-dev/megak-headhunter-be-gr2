import { User } from 'src/modules/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recruiter extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, length: 55 })
  fullName: string;

  @Column({ nullable: false, length: 55 })
  company: string;

  @Column({ type: 'smallint' })
  maxReservedStudents: number;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  [key: string]: unknown;
}
