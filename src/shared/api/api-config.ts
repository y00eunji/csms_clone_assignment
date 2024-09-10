import axios, { AxiosHeaders, InternalAxiosRequestConfig, Method } from 'axios';

// Axios 인스턴스를 생성하는 함수
const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 10000,
  });

  // 요청 인터셉터 설정
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
      const accessToken = sessionStorage.getItem('accessToken');

      // config.headers가 없으면 AxiosHeaders로 초기화
      if (!config.headers) {
        config.headers = new AxiosHeaders(); // AxiosHeaders를 이용해 빈 헤더를 생성
      }

      if (accessToken) config.headers.set('Authorization', `Bearer ${accessToken}`); // Authorization 헤더 설정

      return config;
    },
    error => Promise.reject(error),
  );

  return instance;
};

// 두 개의 API URL을 사용할 수 있는 인스턴스

export const axiosRequest = async <T>(
  axiosInstance: ReturnType<typeof createAxiosInstance>,
  method: Method = 'GET',
  url: string,
  data?: object | ArrayBuffer | Record<string, unknown>,
  params?: Record<string, any>,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
      params,
      headers,
    });

    return response.data;
  } catch (error) {
    // 만약 description 속성에 토큰 만료 메시지가 있으면 리프레시 토큰으로 재요청
    if (axios.isAxiosError(error)) {
      // AxiosError 타입인지 확인
      if (error.response && 'Token is expired' === error.response.data?.description) {
        const refreshToken = sessionStorage.getItem('refreshToken');

        if (refreshToken) {
          try {
            // 리프레시 토큰으로 토큰 재발급 요청
          } catch (refreshError) {
            console.error('Failed to refresh token', refreshError);
            throw refreshError;
          }
        } else {
          console.error('Refresh token not found');
          throw error;
        }
      }
    }

    throw error;
  }
};
export const tokenApi = createAxiosInstance('https://tokenissuerdev.autocrypt.io/api');
export const csmsApi = createAxiosInstance('https://devcsms-srv.eviq.io/api');
// const test = axiosRequest('https://tokenissuerdev.autocrypt.io/api', 'GET', '/test');

// console.log(test);
