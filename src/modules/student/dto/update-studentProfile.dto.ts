import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentProfileDto } from './create-studentProfile.dto';

export class UpdateStudentProfileDto extends PartialType(
  CreateStudentProfileDto,
) {}
