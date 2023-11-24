import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async findOne(email: string) {
    return await User.findOneByOrFail({ email });
  }
}
