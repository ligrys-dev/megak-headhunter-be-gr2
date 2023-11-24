import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async findOneByEmail(email: string) {
    return await User.findOneBy({ email });
  }
}
