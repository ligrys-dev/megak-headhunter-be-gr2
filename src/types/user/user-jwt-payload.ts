import { Role } from './enums/role';

export interface UserJwtPayload {
  sub: string;
  isActive: boolean;
  role: Role;
}

export interface UserFromReq {
  userId: string;
  isActive: boolean;
  role: Role;
}
