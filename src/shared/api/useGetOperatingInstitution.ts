import { axiosRequest, csmsApi } from '@/shared/api/api-config.ts';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IResponseGetOperatingInstitution {
  resultCode: number;
  description: string;
  needRedirect: boolean;
  resultData: {
    label: string;
    value: string;
  }[];
}

const getOperatingInstitution = async () => {
  return await axiosRequest<IResponseGetOperatingInstitution>(csmsApi, 'GET', '/operating-institution/register/list');
};

export const useGetOperatingInstitution = (): UseQueryResult<{ label: string; value: string }[], AxiosError> => {
  return useQuery({
    queryKey: ['get-operating-institution'],
    queryFn: getOperatingInstitution,
    select: data => data.resultData,
  });
};
