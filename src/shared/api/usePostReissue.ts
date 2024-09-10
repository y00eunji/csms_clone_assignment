import { tokenApi, axiosRequest } from '@/shared/api/api-config.ts';
import { setTokens } from '@/shared/lib/storage.ts';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IRequestPostReissueToken {
  accessToken: string;
  refreshToken: string;
}

interface IResponsePostReissueToken {
  resultCode: string;
  description: string;
  needRedirect: boolean;
  resultData: {
    accessToken: string;
    refreshToken: string;
  };
}

const postReissue = async (data: IRequestPostReissueToken) => {
  return await axiosRequest<IResponsePostReissueToken>(tokenApi, 'POST', '/token/reissue', data);
};

export const usePostReissue = (): UseMutationResult<
  IResponsePostReissueToken,
  AxiosError,
  IRequestPostReissueToken
> => {
  return useMutation({
    mutationKey: ['post-login'],
    mutationFn: (data: IRequestPostReissueToken) => postReissue(data),
    onSuccess: data => {
      if (data.resultData) {
        // 이거 문서에 리프레시 토큰이 안오는거라서 혹시 모름 확인해봐야됨
        setTokens(data.resultData.accessToken, data.resultData.refreshToken); // 세션 스토리지에 토큰 저장
      }
    },
  });
};
