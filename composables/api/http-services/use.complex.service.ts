import type { AxiosInstance } from 'axios';
import { EndpointsEnum } from '../http-common/prefix.enum';
import {
  type ServiceResponseType,
  type IPostAvatar,
  type IPostComplex,
} from '../interfaces';

export const useComplexService = (axiosInstance: AxiosInstance) => {
  const postComplex = ({
    data,
  }: {
    data: IPostAvatar;
  }): ServiceResponseType<IPostComplex> => {
    return axiosInstance.post(EndpointsEnum.Complex.Complexes, data);
  };

  return {
    postComplex,
  };
};
