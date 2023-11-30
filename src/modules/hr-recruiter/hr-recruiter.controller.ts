import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';
import { CreateHrRecruiterDto } from './dto/create-hr-recruiter.dto';
import { UpdateHrRecruiterDto } from './dto/update-hr-recruiter.dto';

@Controller('hr-recruiter')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrRecruiterService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHrRecruiterDto: UpdateHrRecruiterDto,
  ) {
    return this.hrRecruiterService.update(+id, updateHrRecruiterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrRecruiterService.remove(+id);
  }
}
