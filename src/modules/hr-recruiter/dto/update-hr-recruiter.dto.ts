import { PartialType } from '@nestjs/mapped-types';
import { CreateHrRecruiterDto } from './create-hr-recruiter.dto';

export class UpdateHrRecruiterDto extends PartialType(CreateHrRecruiterDto) {
    id: number;
    email: string;
    fullName: string;
    company: string;
    maxReservedStudents: number;
}
