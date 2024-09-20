import { ApiResponse } from '@/shared/model/type.ts';

import { clearTokens, getTokens, setTokens } from '../lib/storage';
import { ERROR_CODE, TYPE_ERROR_CODE } from '../model/const';
import { useAuthStore } from '../model/useAuthStore';
import { createAxiosInstance } from './axiosInstance';
import { postReissue } from './postReissue';

export const axiosRequest = async <T>(
  axiosInstance: ReturnType<typeof createAxiosInstance>,
  method: string = 'GET',
  url: string,
  data?: object,
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
                handleLogout();
              }
            } catch (error) {
              console.error('Failed to request', error);
              handleLogout();
            }
          }
          break;
        }

        case 1002:
        case 2013:
          handleLogout();
          break;
      }
    }

    return resultData;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

const handleLogout = () => {
  clearTokens();
  useAuthStore.getState().logout();
};

export const tokenApi = createAxiosInstance('https://tokenissuerdev.autocrypt.io/api');
export const csmsApi = createAxiosInstance('https://devcsms-srv.eviq.io/api');
