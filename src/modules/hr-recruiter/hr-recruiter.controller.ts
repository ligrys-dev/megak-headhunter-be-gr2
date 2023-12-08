import { Controller, Get, Param, Req } from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';
import { Request } from 'express';
import { UserFromReq } from 'src/types';

@Controller('hr')
export class HrRecruiterController {
  constructor(private readonly hrRecruiterService: HrRecruiterService) {}

  @Get()
  findAll() {
    return this.hrRecruiterService.findAll();
  }

  @Get('/reserve/:email')
  reserveStudent(@Req() req: Request, @Param('email') email: string) {
    return this.hrRecruiterService.reseveStudent(
      email,
      (req.user as UserFromReq).userId,
    );
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.hrRecruiterService.findOne(id);
  }
}
