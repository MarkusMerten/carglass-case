import { Roles } from './roles';

export interface User {
  name: string;
  eMail: string;
  role: Roles;
  loginDate: Date | null;
}
