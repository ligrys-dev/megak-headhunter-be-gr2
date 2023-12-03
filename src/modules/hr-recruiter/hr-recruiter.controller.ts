import { Controller, Get, Param } from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';

@Controller('hr')
export class HrRecruiterController {
  constructor(private readonly hrRecruiterService: HrRecruiterService) {}

  @Get()
  findAll() {
    return this.hrRecruiterService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.hrRecruiterService.findOne(id);
  }
}
