import { AxiosError, type AxiosResponse } from 'axios';
import { useToast } from 'vue-toastification';
import { detectError } from './detect.error';

export const ErrorInterceptor = (
  error: AxiosError
): Promise<AxiosResponse /*| {}*/> => {
  const getJsonErrorData = error.toJSON();
  const responseData = error?.response?.data || getJsonErrorData;
  // const url = getJsonErrorData?.config?.url;
  // const checksAuthorizationUrl = url.includes('/users/authorized');

  // if (checksAuthorizationUrl) {
  //   return Promise.resolve(responseData);
  // }

  if (getJsonErrorData?.status === 401) {
    // if (!import.meta.env.VITE_SERVER_AUTH.includes(window.location.host)) {
    //   window.location.href = '';
    // }

    // if (process.browser) {
      // const toast = useToast();
      // const { $i18n } = useNuxtApp();
      // toast.error($i18n.t('server_error_messages.UNAUTHORIZED'));
      // window.location.href = '/login'
    // }

    return Promise.reject(responseData);
  }

  if (process.browser && responseData?.message) {
    const toast = useToast();

    toast.error(detectError(responseData));
  }

  return Promise.reject(getJsonErrorData);
};
