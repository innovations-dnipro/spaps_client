import {
  useAuthorizationService,
  useClientService,
  useComplexService,
  useRentorService,
} from './http-services';
import { useAxiosInstance } from './use.axios.instance';

export const useApi = () => {
  const axiosInstance = useAxiosInstance();

  return {
    AuthorizationService: useAuthorizationService(axiosInstance),
    ClientService: useClientService(axiosInstance),
    ComplexService: useComplexService(axiosInstance),
    RentorService: useRentorService(axiosInstance),
  };
};
