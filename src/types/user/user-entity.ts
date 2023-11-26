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

export type NewUserEntity = Omit<UserEntity, 'id' | 'createdAt'>;

export type SaveUserEntity = Omit<UserEntity, 'pwdHash' | 'activationToken'>;
