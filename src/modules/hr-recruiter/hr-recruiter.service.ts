import { Injectable } from '@nestjs/common';
import { CreateHrRecruiterDto } from './dto/create-hr-recruiter.dto';
import { UpdateHrRecruiterDto } from './dto/update-hr-recruiter.dto';

@Injectable()
export class HrRecruiterService {
  create(createHrRecruiterDto: CreateHrRecruiterDto) {
    return 'This action adds a new hrRecruiter';
  }

  findAll() {
    return `This action returns all hrRecruiter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hrRecruiter`;
  }

  update(id: number, updateHrRecruiterDto: UpdateHrRecruiterDto) {
    return `This action updates a #${id} hrRecruiter`;
  }

  remove(id: number) {
    return `This action removes a #${id} hrRecruiter`;
  }
}
