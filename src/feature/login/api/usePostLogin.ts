import { axiosRequest, tokenApi } from '@/shared/api/request.ts';
import { setTokens } from '@/shared/lib/storage.ts';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IRequestPostToken {
  userId: string;
  userPassword: string;
  serviceType: string;
}

interface IResponsePostToken {
  accessToken: string;
  refreshToken: string;
}

const postLogin = async (data: IRequestPostToken): Promise<IResponsePostToken> => {
  return await axiosRequest<IResponsePostToken>(tokenApi, 'POST', '/auth/login', data);
};

export const usePostLogin = (): UseMutationResult<IResponsePostToken, AxiosError, IRequestPostToken> => {
  return useMutation({
    mutationKey: ['post-login'],
    mutationFn: (data: IRequestPostToken) => postLogin(data),
    onSuccess: (response: IResponsePostToken) => {
      if (response) {
        const { accessToken, refreshToken } = response;
        setTokens(accessToken, refreshToken);
      }
    },
  });
};
