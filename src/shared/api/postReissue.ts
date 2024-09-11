import { tokenApi, axiosRequest, ApiResponse } from '@/shared/api/api-config.ts';

interface IPostReissueToken {
  accessToken: string;
  refreshToken: string;
}

export const postReissue = async (data: IPostReissueToken) => {
  return await axiosRequest<ApiResponse<IPostReissueToken>>(tokenApi, 'POST', '/token/reissue', data);
};
