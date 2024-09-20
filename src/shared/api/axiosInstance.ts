import axios, { AxiosHeaders, InternalAxiosRequestConfig } from 'axios';

export const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!config.headers) config.headers = new AxiosHeaders();
      if (accessToken) config.headers.set('Authorization', `Bearer ${accessToken}`);
      return config;
    },
    error => Promise.reject(error),
  );

  return instance;
};
