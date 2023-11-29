import { Role } from './enums';

export interface UserEntity {
  id: string;
  username: string;
  email: string;
  role: Role;
  pwdHash: string;
  isActive: boolean;
  activationToken: string;
  createdAt: Date;
}

export interface NewUserEntity extends Omit<UserEntity, 'id' | 'createdAt'> {}
