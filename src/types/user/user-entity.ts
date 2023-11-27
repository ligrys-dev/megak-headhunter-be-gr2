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
