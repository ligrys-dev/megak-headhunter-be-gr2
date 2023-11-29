import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Role, SaveUserEntity } from 'src/types';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('/login')
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(req.user as SaveUserEntity, res);
  }

  @Post('/logout')
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }

  @UseGuards(JwtAuthGuard) //test
  @Get('/test')
  getUserFromReq(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard) //test
  @Roles(Role.ADMIN)
  @Get('/role')
  testRole(@Req() req: Request) {
    return req.user;
  }
}
