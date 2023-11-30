import { Injectable } from '@nestjs/common';
import { CreateHrRecruiterDto } from './dto/create-hr-recruiter.dto';
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

  async findAll() {
    return await Recruiter.find();
  }

  async findOne(id: string) {
    return await Recruiter.findOneByOrFail({ id });
  }
}
