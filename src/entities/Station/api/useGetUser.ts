import { axiosRequest, csmsApi } from '@/shared/api/request.ts';

import { useQuery } from '@tanstack/react-query';

interface IResponseGetUser {
  resultData: {
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
  };
}

const getUser = async (): Promise<IResponseGetUser> => {
  return await axiosRequest<IResponseGetUser>(csmsApi, 'GET', '/account/user');
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ['get-user'],
    queryFn: getUser,
    select: data => data.resultData,
  });
};
