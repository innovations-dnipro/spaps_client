import type { IParams } from '../interfaces';
import { url_prefix } from './basic.urls';

const url = url_prefix.users;

export const EndpointsEnumAuth = {
  Authorized: `${url}/authorized`,
  ChangeEmail: ({ email }: IParams) => `${url}/change-email/${email}`,
  ConfirmEmailChangeCode: ({ code }: IParams) =>
    `${url}/confirm-email-change-code/${code}`,
  Login: `${url}/login`,
  Logout: `${url}/logout`,
  PasswordReset: `${url}/password-reset`,
  PersonalData: `${url}/personal-data`,
  Register: `${url}/register`,
  ConfirmRegistrationCode: ({ code }: IParams) =>
    `${url}/confirm-registration-code/${code}`,
  SetPassword: `${url}/set-password`,
  PasswordResetEmail: ({ email }: IParams) =>
    `${url}/password-reset-email/${email}`,
  PasswordResetConfirmCode: ({ code }: IParams) =>
    `${url}/password-reset-confirm-code/${code}`,
  ChangePhone: ({ phone }: IParams) => `${url}/change-phone/${phone}`,
  ConfirmPhoneChangeCode: ({ code }: IParams) =>
    `${url}/confirm-phone-change-code/${code}`,
  CurrentPassword: `${url}/current-password`,
  NewPassword: `${url}/new-password`,
};
