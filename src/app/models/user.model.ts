import { Roles } from './roles.model';

export interface User {
  name: string;
  eMail: string;
  role: Roles;
  loginDate: Date | null;
}
