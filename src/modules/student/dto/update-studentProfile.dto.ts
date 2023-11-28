import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentProfileDto } from './create-studentProfile.dto';
// import { ContractType, StudentStatus, TypeWork } from 'src/types';

export class UpdateStudentProfileDto extends PartialType(
  CreateStudentProfileDto,
) {}
