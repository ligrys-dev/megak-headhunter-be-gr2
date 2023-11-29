import { Injectable } from '@nestjs/common';
import { CreateHrRecruiterDto } from './dto/create-hr-recruiter.dto';
import { UpdateHrRecruiterDto } from './dto/update-hr-recruiter.dto';
import { Recruiter } from './entities/hr-recruiter.entity';

@Injectable()
export class HrRecruiterService {
  async create(createHrRecruiterDto: CreateHrRecruiterDto) {
    const recruiter = new Recruiter();
    for (const [key, value] of Object.entries(createHrRecruiterDto)) {
      recruiter[key] = value;
    }
    return await recruiter.save();
  }

  findAll() {
    return `This action returns all hrRecruiter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hrRecruiter`;
  }

  update(id: number, updateHrRecruiterDto: UpdateHrRecruiterDto) {
    console.log(updateHrRecruiterDto);
    return `This action updates a #${id} hrRecruiter`;
  }

  remove(id: number) {
    return `This action removes a #${id} hrRecruiter`;
  }
}
