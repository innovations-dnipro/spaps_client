import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  ServiceResponseType,
  LoginInterface,
  RLoginInterface,
} from '@spaps/interfaces';
import type { AxiosInstance } from 'axios';

export const useAuthorizationService = (axiosInstance: AxiosInstance) => {
  const login = (
    data: LoginInterface
  ): ServiceResponseType<RLoginInterface> => {
    return axiosInstance.post(EndpointsEnum.Authorization.Login, data);
  };

  const logout = (): ServiceResponseType<boolean> => {
    return axiosInstance.get(EndpointsEnum.Authorization.Logout);
  };

  return {
    login,
    logout,
  };
};
