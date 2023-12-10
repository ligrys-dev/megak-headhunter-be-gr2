import { Controller, Param, Patch, Req } from '@nestjs/common';
import { HrRecruiterService } from './hr-recruiter.service';
import { Request } from 'express';
import { UserFromReq } from 'src/types';

@Controller('hr')
export class HrRecruiterController {
  constructor(private readonly hrRecruiterService: HrRecruiterService) {}

  @Patch('/reserve/:email')
  reserveStudent(@Req() req: Request, @Param('email') email: string) {
    return this.hrRecruiterService.reserveStudent(
      email,
      (req.user as UserFromReq).userId,
    );
  }
}
