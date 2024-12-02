import { axiosRequest, tokenApi } from '@/shared/api/request.ts';
import { clearTokens } from '@/shared/lib/storage.ts';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IResponsePostLogout {
  status: string;
}

const postLogout = async (): Promise<IResponsePostLogout> => {
  return await axiosRequest<IResponsePostLogout>(tokenApi, 'POST', '/auth/logout');
};

export const usePostLogout = (): UseMutationResult<IResponsePostLogout, AxiosError> => {
  return useMutation({
    mutationKey: ['post-logout'],
    mutationFn: () => postLogout(),
    onSuccess: () => {
      clearTokens();
    },
  });
};
