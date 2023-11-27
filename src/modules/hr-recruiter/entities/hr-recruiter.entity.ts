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


    @Column({ 
        unique: true,
        type: 'varchar',
        length: 254,
    })
    email: string

    @Column({ 
      nullable: false,
      type: 'varchar',
      length: 55,
    })
    fullname: string;
    
    @Column({ 
      nullable: false,
      type: 'varchar',
      length: 55,
  })
    company: string;

    @Column({ 
      length: 3,
      type: 'int',
    })
    maxReservedStudents: number;

}