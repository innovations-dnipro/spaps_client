import type { ENonAdminRole } from '@spaps/enums';
import type { Nullable } from '@spaps/types';

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  name: string;
  surname: string;
  role: ENonAdminRole;
}

export interface ILoginResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: Nullable<string>;
  role: ENonAdminRole;
}

export interface IConfirmRegistrationCode {
  password: string;
}

export interface IPasswordResetConfirmCode {
  email: string;
}

export interface IPasswordReset {
  password: string;
}
