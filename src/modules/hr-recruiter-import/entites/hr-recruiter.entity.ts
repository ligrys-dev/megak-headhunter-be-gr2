import { Role } from 'src/types';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recruiter extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Matches()
    @Column({ 
        unique: true,
        type: 'varchar',
        length: 254,
    })
    email: string

    @Column({ nullable: false })
    fullname: string;
    
    @Column({ nullable: false })
    company: string;

    @Column({ length: 3})
    maxReservedStudents: number;

}