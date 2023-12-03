import { Injectable } from '@nestjs/common';
import { CreateHrRecruiterDto } from './dto/create-hr-recruiter.dto';
import { RecruiterEntity } from './entities/hr-recruiter.entity';

@Injectable()
export class HrRecruiterService {
  async create(createHrRecruiterDto: CreateHrRecruiterDto) {
    const recruiter = new RecruiterEntity();
    for (const [key, value] of Object.entries(createHrRecruiterDto)) {
      recruiter[key] = value;
    }
    return await recruiter.save();
  }

  async findAll() {
    return await RecruiterEntity.find();
  }

  async findOne(id: string) {
    return await RecruiterEntity.findOneByOrFail({ id });
  }
}
