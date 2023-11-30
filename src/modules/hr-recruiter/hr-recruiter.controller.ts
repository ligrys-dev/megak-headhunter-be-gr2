import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';
import { CreateHrRecruiterDto } from './dto/create-hr-recruiter.dto';

@Controller('hr')
export class HrRecruiterController {
  constructor(private readonly hrRecruiterService: HrRecruiterService) {}

  @Post()
  create(@Body() createHrRecruiterDto: CreateHrRecruiterDto) {
    return this.hrRecruiterService.create(createHrRecruiterDto);
  }

  @Get()
  findAll() {
    return this.hrRecruiterService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.hrRecruiterService.findOne(id);
  }
}
