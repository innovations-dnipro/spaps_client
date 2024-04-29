import type { IParams } from '../interfaces';
import { url_prefix } from './basic.urls';

const url = url_prefix.users;

export const EndpointsEnumAuth = {
  Login: `${url}/login`,
  Logout: `${url}/logout`,
  Register: `${url}/register`,
  ConfirmRegistrationCode: ({ code }: IParams) =>
    `${url}/confirm-registration-code/${code}`,
  SetPassword: `${url}/set-password`,
  PasswordResetEmail: ({ email }: IParams) =>
    `${url}/password-reset-email/${email}`,
  PasswordResetConfirmCode: ({ code }: IParams) =>
    `${url}/password-reset-confirm-code/${code}`,
  PasswordReset: `${url}/password-reset`,
};
