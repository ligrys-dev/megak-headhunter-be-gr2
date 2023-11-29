import { Role } from './enums/role';

export interface UserJwtPayload {
  sub: string;
  isActive: boolean;
  role: Role;
}
