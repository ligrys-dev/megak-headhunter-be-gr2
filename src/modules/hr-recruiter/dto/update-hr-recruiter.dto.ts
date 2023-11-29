import { PartialType } from '@nestjs/mapped-types';
import { CreateHrRecruiterDto } from './create-hr-recruiter.dto';

export class UpdateHrRecruiterDto extends PartialType(CreateHrRecruiterDto) {}
