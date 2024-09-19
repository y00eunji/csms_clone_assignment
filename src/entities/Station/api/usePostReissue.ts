import { tokenApi, axiosRequest, ApiResponse } from '@/shared/api/api-config.ts';

interface IPostReissueToken {
  accessToken: string;
  refreshToken: string;
}

export const usePostReissue = async (data: IPostReissueToken): Promise<ApiResponse<IPostReissueToken>> => {
  return await axiosRequest<ApiResponse<IPostReissueToken>>(tokenApi, 'POST', '/token/reissue', data);
};
