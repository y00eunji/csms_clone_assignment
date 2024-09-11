import { axiosRequest, csmsApi } from '@/shared/api/api-config.ts';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IResponseGetUser {
  userId: string;
  idPk: string;
  role: number;
  detailRole: {
    menu: number;
    readRole: number;
    updateRole: number;
    deleteRole: number;
    createRole: number;
  }[];
  isRoaming: boolean;
}

const getUser = async (): Promise<IResponseGetUser> => {
  return await axiosRequest<IResponseGetUser>(csmsApi, 'GET', '/account/user');
};

export const useGetUser = (): UseQueryResult<string, AxiosError> => {
  return useQuery({
    queryKey: ['get-user'],
    queryFn: getUser,
    select: data => data.userId,
  });
};
