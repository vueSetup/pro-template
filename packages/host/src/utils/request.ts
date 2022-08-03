import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import { notification } from 'ant-design-vue';

const request = axios.create();

export type Response<T> = AxiosResponse<{
  success: true;
  result: T;
  message: string;
}>;

export type Error = AxiosError<
  | {
      success: false;
      path?: string;
      error?: string;
    }
  | string
>;

const requestHandler = (config: AxiosRequestConfig) => {
  const REQUEST_TOKEN_KEY = 'X-Access-Token';
  const STORAGE_TOKEN_KEY = 'pro__Access-Token';
  let token = localStorage.getItem(STORAGE_TOKEN_KEY);
  token = token ? JSON.parse(token).value : null;
  config.headers = {
    ...config.headers,
    [REQUEST_TOKEN_KEY]: token,
  };
  return config;
};

const responseHandler = <T>(response: Response<T>) => {
  const { success, result, message } = response.data;
  if (success) {
    // TODO :: request.get ?
    return {
      data: result,
    } as unknown as T;
  } else {
    notification.error({
      message,
    });
    throw new Error(message);
  }
};

const errorHandler = (error: Error): Promise<unknown> => {
  const { response } = error;
  if (response) {
    const { data, status, statusText } = response;
    const message = typeof data === 'string' ? data : data.error;
    switch (status) {
      case 401:
        notification.error({
          message,
        });
        // 如果你需要直接跳转登录页面
        // location.replace(
        //   `${process.env.VUE_APP_PUBLIC_PATH} + ${loginRoutePath}`.replaceAll('//', '/'),
        // );
        break;
      case 403:
        notification.error({
          message,
        });
        break;
      case 500:
        notification.error({
          message,
        });
        break;
    }
  }
  return Promise.reject(error);
};

// Add a request interceptor
request.interceptors.request.use(
  // Do something before request is sent
  requestHandler,
  // Do something with request error
  errorHandler,
);

// Add a response interceptor
request.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  responseHandler,
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  errorHandler,
);

export default request;
