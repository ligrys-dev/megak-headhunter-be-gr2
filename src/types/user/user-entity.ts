import { User } from 'src/modules/user/entities/user.entity';
import { Role } from './enums';

export interface UserEntity {
  id: string;
  email: string;
  role: Role;
  pwdHash: string;
  isActive: boolean;
  activationToken: string;
  createdAt: Date;
}

export type NewUserEntity = Pick<UserEntity, 'email'>;

export interface UserWithRandomPwd {
  newUser: User;
  password: string;
}
