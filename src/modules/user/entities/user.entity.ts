import { Role } from 'src/types/user';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column({ nullable: false }) name: string;

  @Column({ nullable: false }) email: string;

  @Column({ nullable: false }) role: Role;

  @Column({ nullable: false }) pwdHash: string;

  @Column({ default: false, nullable: false }) isActive: boolean;

  @Column({ default: () => 'uuid()' }) activationToken: string;

  @CreateDateColumn() createdAt: Date;
}
