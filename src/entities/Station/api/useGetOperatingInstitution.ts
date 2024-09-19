import { axiosRequest, csmsApi } from '@/shared/api/api-config.ts';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface Option {
  label: string;
  value: string;
}

export type IResponseGetOperatingInstitution = Option[];

const getOperatingInstitution = async (): Promise<IResponseGetOperatingInstitution> => {
  return await axiosRequest<IResponseGetOperatingInstitution>(csmsApi, 'GET', '/operating-institution/register/list');
};

export const useGetOperatingInstitution = (): UseQueryResult<{ label: string; value: string }[], AxiosError> => {
  return useQuery({
    queryKey: ['get-operating-institution'],
    queryFn: getOperatingInstitution,
  });
};
