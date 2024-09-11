import { axiosRequest, csmsApi } from '@/shared/api/api-config.ts';

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';

enum StationOperatingStatusEnum { // 충전소 운영 상태
  OPERATING, // 운영중 1
  PAUSE, // 임시중지 2
  STOP, // 영구중지 3
}

interface IParamsPostStationList extends Record<string, unknown> {
  descending: boolean; // 내림차순 여부
  page: number; // 현재 페이지
  rowsPerPage: number; // 페이지 내 출력 목록 수
  sortBy?: string; //  정렬 기준 값
  rowsNumber?: number; // 총 결과 목록 수
}

interface IRequestPostStation {
  evStationAddress?: string;
  evStationName?: string;
  operatingInstitutionList?: string[];
  operatingStatus?: StationOperatingStatusEnum;
}

interface IResponsePostStation {
  contents: {
    no: number; // 결과 순서
    evStationId: string; // 충전소 ID
    operatingInstitution: string; // 운영기관
    evStationName: string; // 충전소 이름
    address: {
      // 충전소 주소
      main: string; // 도로명 주소까지
      detail: string | null; // 상세 주소
    };
    userLimit: {
      // 사용 정보
      item: number; // 공통 여부 타입
      detail: string | null; // 공용 구분 설명
    };
    operatingStatus: number; // 운영 상태 Enum 값
    registerDate: string; // ISO 8601 format, 등록일자
  }[];
  pagination: {
    page: number; // 현재 페이지
    rowsPerPage: number; // 페이지 내 출력 목록 수
    sortBy: string[]; // 정렬 기준 값
    descending: boolean; // 내림차순 여부
    rowsNumber: number; // 총 결과 목록 수
  };
  operatingStatistics: {
    operating: number; // 운영중 수
    pause: number; // 임시중지 수
    stop: number; // 영구중지 수
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
      console.log(data);
      return data;
    },
  });
};
