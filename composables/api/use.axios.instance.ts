import axios, { type AxiosResponse } from 'axios';
import {
  AXIOS_BASE_URL,
  ErrorInterceptor,
  UrlInterceptor,
} from './interceptors';

let axiosInstance: any = null;

export const useAxiosInstance = () => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: AXIOS_BASE_URL as string,
    });

    axiosInstance.interceptors.request.use(UrlInterceptor);
    axiosInstance.interceptors.response.use(({ data }: AxiosResponse) => {
      return data;
    }, ErrorInterceptor);
  }

  return axiosInstance;
};
