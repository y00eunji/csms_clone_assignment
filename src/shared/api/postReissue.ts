import { axiosRequest, tokenApi } from '@/shared/api/request.ts';
import { ApiResponse } from '@/shared/model/type.ts';

interface IPostReissueToken {
  accessToken: string;
  refreshToken: string;
}

export const postReissue = async (data: IPostReissueToken): Promise<ApiResponse<IPostReissueToken>> => {
  return await axiosRequest<ApiResponse<IPostReissueToken>>(tokenApi, 'POST', '/token/reissue', data);
};
