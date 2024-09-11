import { postReissue } from '@/shared/api/postReissue.ts';
import { ERROR_CODE, TYPE_ERROR_CODE } from '@/shared/constants/errorCode.ts';
import { clearTokens, getTokens, setTokens } from '@/shared/lib/storage.ts';

import axios, { AxiosHeaders, InternalAxiosRequestConfig, Method } from 'axios';

export interface ApiResponse<T> {
  resultCode: number;
  description: string;
  needRedirect: boolean;
  resultData: T;
}

// Axios 인스턴스를 생성하는 함수
const createAxiosInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 10000,
  });

  // 요청 인터셉터 설정
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

export const axiosRequest = async <T>(
  axiosInstance: ReturnType<typeof createAxiosInstance>,
  method: Method = 'GET',
  url: string,
  data?: object | ArrayBuffer | Record<string, unknown>,
  params?: Record<string, unknown>,
  headers?: Record<string, string>,
): Promise<T> => {
  try {
    const response = await axiosInstance.request<ApiResponse<T>>({
      method,
      url,
      data,
      params,
      headers,
    });

    const { resultData, resultCode } = response.data;

    // 토큰 관련 에러 처리
    if (ERROR_CODE.includes(resultCode as TYPE_ERROR_CODE)) {
      switch (resultCode) {
        case 1004: {
          const { accessToken, refreshToken } = getTokens();
          if (refreshToken && accessToken) {
            try {
              const result = await postReissue({ accessToken, refreshToken });
              if (!ERROR_CODE.includes(result.resultCode as TYPE_ERROR_CODE)) {
                setTokens(result.resultData.accessToken);
              } else {
                console.log('토큰 갱신 실패, 로그아웃 처리');
                clearTokens();
              }
            } catch (refreshError) {
              console.error('Failed to refresh token', refreshError);
              clearTokens();
            }
          }
          break;
        }

        case 1002: // 액세스 토큰 복호화 실패
        case 2013: // 리프레시 토큰이 만료
          console.log('메인으로 보내기');
          clearTokens();
          break;
      }
    }

    return resultData;
  } catch (error) {
    console.error('Failed to request', error);
  }

  // 예외 상황을 처리한 후에도 문제가 해결되지 않은 경우, 호출한 쪽에서 에러 처리
  /*
  함수가 Promise<T>를 반환한다고 선언했기 때문에, 모든 코드 경로에서 T 타입의 값을 반환하거나, 에러를 던져야 합니다.
  만약 throw error;가 없으면, 함수가 항상 T를 반환한다고 보장할 수 없어서 타입 에러가 발생할 수 있습니다.
   */
  throw Error;
};

export const tokenApi = createAxiosInstance('https://tokenissuerdev.autocrypt.io/api');
export const csmsApi = createAxiosInstance('https://devcsms-srv.eviq.io/api');
