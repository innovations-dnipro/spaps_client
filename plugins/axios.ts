import axios from 'axios';
import { ErrorInterceptor, UrlInterceptor } from '@spaps/api/interceptors';

const createApi = () => {
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use(UrlInterceptor);
  axiosInstance.interceptors.response.use(({ data }) => {
    return data;
  }, ErrorInterceptor);

  return axiosInstance;
};

export default defineNuxtPlugin(async () => {
  return {
    provide: {
      axios: createApi(),
    },
  };
});
