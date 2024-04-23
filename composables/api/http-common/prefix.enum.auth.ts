import { url_prefix } from './basic.urls';

const url = url_prefix.users;

export const EndpointsEnumAuth = {
  Login: `${url}/login`,
  Logout: `${url}/logout`,
};
