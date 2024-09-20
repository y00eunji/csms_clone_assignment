import { axiosRequest, csmsApi } from '@/shared/api/request.ts';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

interface IParamsPostStationList extends Record<string, unknown> {
  descending: boolean;
  page: number;
  rowsPerPage: number;
  sortBy?: string;
  rowsNumber?: number;
}

export interface IResponsePostStation {
  contents: {
    no: number;
    evStationId: string;
    operatingInstitution: string;
    evStationName: string;
    address: {
      main: string;
      detail: string | null;
    };
    userLimit: {
      item: number;
      detail: string | null;
    };
    operatingStatus: number;
    registerDate: string;
  }[];
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy: string[];
    descending: boolean;
    rowsNumber: number;
  };
  operatingStatistics: {
    operating: number;
    pause: number;
    stop: number;
  };
}

const postStationList = async (request: { params: IParamsPostStationList }): Promise<IResponsePostStation> => {
  const { params } = request;
  return await axiosRequest<IResponsePostStation>(csmsApi, 'POST', '/ev-station/list/search', params);
};

export const usePostStationList = (): UseMutationResult<
  IResponsePostStation,
  AxiosError,
  { params: IParamsPostStationList }
> => {
  return useMutation({
    mutationKey: ['post-station-list'],
    mutationFn: (request: { params: IParamsPostStationList }) => postStationList(request),
    onSuccess: data => {
      return data;
    },
  });
};
