import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { comparePwd } from 'src/utils/handle-pwd';

@Injectable()
export class AuthService {
  async login(user: Express.User) {
    return user;
  }
  constructor(private userService: UserService) {}

  async validateUser(email: string, pwd: string) {
    const user = await this.userService.findOne(email);

    if (user && (await comparePwd(pwd, user.pwdHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pwdHash, activationToken, ...result } = user;
      return result;
    }
    return null;
  }
}
