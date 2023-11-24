import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { comparePwd } from 'src/utils/handle-pwd';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async login(user: Express.User) {
    return user;
  }

  async validateUser(email: string, pwd: string) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await comparePwd(pwd, user.pwdHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { pwdHash, activationToken, ...result } = user;
    return result;
  }
}
