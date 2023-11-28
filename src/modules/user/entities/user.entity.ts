import { Role } from 'src/types';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  role: Role;

  @Column({ nullable: false })
  pwdHash: string;

  @Column({ default: false, nullable: false })
  isActive: boolean;

  @Column({ default: () => 'uuid()' })
  activationToken: string;

  @CreateDateColumn()
  createdAt: Date;

  [key: string]: any;
}
