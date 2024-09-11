import { tokenApi, axiosRequest } from '@/shared/api/api-config.ts';
import { setTokens } from '@/shared/lib/storage.ts';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IRequestPostToken {
  userId: string;
  userPassword: string;
  serviceType: string;
}

interface IResponsePostToken {
  resultCode: string;
  description: string;
  needRedirect: boolean;
  resultData: {
    accessToken: string;
    refreshToken: string;
  };
}

const postLogin = async (data: IRequestPostToken) => {
  return await axiosRequest<IResponsePostToken>(tokenApi, 'POST', '/auth/login', data);
};

export const usePostLogin = (): UseMutationResult<IResponsePostToken, AxiosError, IRequestPostToken> => {
  return useMutation({
    mutationKey: ['post-login'],
    mutationFn: (data: IRequestPostToken) => postLogin(data),
    onSuccess: data => {
      console.log(data);
      if (data.resultData) {
        setTokens(data.resultData.accessToken, data.resultData.refreshToken); // 세션 스토리지에 토큰 저장
      }
    },
  });
};
