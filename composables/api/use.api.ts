import { useAuthorizationService } from './http-services';
import { useAxiosInstance } from './use.axios.instance';

export const useApi = () => {
  const axiosInstance = useAxiosInstance();

  return {
    AuthorizationService: useAuthorizationService(axiosInstance),
  };
};
