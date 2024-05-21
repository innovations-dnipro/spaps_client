import type { AxiosInstance } from 'axios';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  type IParams,
  type ILogin,
  type IRegister,
  type ServiceResponseType,
  type ILoginResponse,
  type IConfirmRegistrationCode,
  type IPasswordResetConfirmCode,
  type IPasswordReset,
} from '../interfaces';

export const useAuthorizationService = (axiosInstance: AxiosInstance) => {
  const checkIsAuthorized = () => {
    return axiosInstance.get(EndpointsEnum.Authorization.Authorized);
  };

  const getPersonalData = () => {
    return axiosInstance.get(EndpointsEnum.Authorization.PersonalData);
  };

  const login = ({
    data,
  }: {
    data: ILogin;
  }): ServiceResponseType<ILoginResponse> => {
    return axiosInstance.post(EndpointsEnum.Authorization.Login, data);
  };

  const logout = (): ServiceResponseType<boolean> => {
    return axiosInstance.get(EndpointsEnum.Authorization.Logout);
  };

  const register = ({
    data,
  }: {
    data: IRegister;
  }): ServiceResponseType<number /* boolean */> => {
    return axiosInstance.post(EndpointsEnum.Authorization.Register, data);
  };

  const confirmRegistrationCode = ({
    params,
  }: {
    params: IParams;
  }): ServiceResponseType<boolean> => {
    return axiosInstance.get(
      EndpointsEnum.Authorization.ConfirmRegistrationCode(params)
    );
  };

  const setPassword = ({
    data,
  }: {
    data: IConfirmRegistrationCode;
  }): ServiceResponseType<boolean> => {
    return axiosInstance.post(EndpointsEnum.Authorization.SetPassword, data);
  };

  const providePasswordResetEmail = ({
    params,
  }: {
    params: IParams;
  }): ServiceResponseType<number> => {
    return axiosInstance.get(
      EndpointsEnum.Authorization.PasswordResetEmail(params)
    );
  };

  const providePasswordResetConfirmCode = ({
    params,
    data,
  }: {
    params: IParams;
    data: IPasswordResetConfirmCode;
  }): ServiceResponseType<boolean> => {
    return axiosInstance.post(
      EndpointsEnum.Authorization.PasswordResetConfirmCode(params),
      data
    );
  };

  const resetPassword = ({ data }: { data: IPasswordReset }) => {
    return axiosInstance.post(EndpointsEnum.Authorization.PasswordReset, data);
  };

  const changeEmail = ({
    params,
  }: {
    params: IParams;
  }): ServiceResponseType<number> => {
    return axiosInstance.get(EndpointsEnum.Authorization.ChangeEmail(params));
  };

  const confirmEmailChangeCode = ({
    params,
  }: {
    params: IParams;
  }): ServiceResponseType<number> => {
    return axiosInstance.get(
      EndpointsEnum.Authorization.ConfirmEmailChangeCode(params)
    );
  };

  const changePhone = ({
    params,
  }: {
    params: IParams;
  }): ServiceResponseType<number> => {
    return axiosInstance.get(EndpointsEnum.Authorization.ChangePhone(params));
  };

  const confirmPhoneChangeCode = ({
    params,
  }: {
    params: IParams;
  }): ServiceResponseType<number> => {
    return axiosInstance.get(
      EndpointsEnum.Authorization.ConfirmPhoneChangeCode(params)
    );
  };

  return {
    changeEmail,
    confirmEmailChangeCode,
    checkIsAuthorized,
    getPersonalData,
    login,
    logout,
    register,
    confirmRegistrationCode,
    setPassword,
    providePasswordResetEmail,
    providePasswordResetConfirmCode,
    resetPassword,
    changePhone,
    confirmPhoneChangeCode,
  };
};
