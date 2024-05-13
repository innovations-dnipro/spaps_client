import type { AxiosInstance } from 'axios';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  type IParams,
  type ServiceResponseType,
  type IPostAvatar,
} from '../interfaces';

export const useClientService = (axiosInstance: AxiosInstance) => {
  const postAvatar = ({
    data,
    params,
  }: {
    data: IPostAvatar;
    params: IParams;
  }): ServiceResponseType<any> => {
    return axiosInstance.post(
      EndpointsEnum.Client.postAvatar({ clientId: params.clientId }),
      data
    );
  };

  const updateClient = ({
    data,
    params,
  }: {
    data: any;
    params: IParams;
  }): ServiceResponseType<any> => {
    return axiosInstance.put(
      EndpointsEnum.Client.updateClient({ clientId: params.clientId }),
      data
    );
  };

  return {
    postAvatar,
    updateClient,
  };
};
