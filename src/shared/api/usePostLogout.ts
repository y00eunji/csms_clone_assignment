import { tokenApi, axiosRequest } from '@/shared/api/api-config.ts';
import { clearTokens } from '@/shared/lib/storage.ts';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IResponsePostLogout {
  resultCode: string;
  description: string;
  needRedirect: boolean;
  resultData: {
    status: string;
  };
}

const postLogout = async () => {
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
