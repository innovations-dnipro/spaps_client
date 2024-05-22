import type { AxiosInstance } from 'axios';
import { EndpointsEnum } from '../http-common/prefix.enum';
import { type IParams, type ServiceResponseType } from '../interfaces';

export const useRentorService = (axiosInstance: AxiosInstance) => {
  const updateRentor = ({
    data,
    params,
  }: {
    data: any;
    params: IParams;
  }): ServiceResponseType<any> => {
    return axiosInstance.put(
      EndpointsEnum.Rentor.updateRentor({ rentorId: params.rentorId }),
      data
    );
  };

  return {
    updateRentor,
  };
};
