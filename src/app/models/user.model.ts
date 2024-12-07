import { RolesModel } from './roles.model';

export interface User {
  name: string;
  eMail: string;
  role: RolesModel;
  loginDate: Date | null;
}
