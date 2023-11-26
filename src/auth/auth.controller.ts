import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { SaveUserEntity } from 'src/types';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user as SaveUserEntity, res);
  }

  @UseGuards(JwtAuthGuard) //test
  @Get('/test')
  getUserFromReq(@Req() req: Request) {
    return req.user;
  }
}
