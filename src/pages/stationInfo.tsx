import { FilterType } from '@/entities/Station/FilterButton.tsx';
import FilterButtons from '@/entities/Station/FilterButtons.tsx';
import Pagination from '@/entities/Station/Pagination.tsx';
import Table from '@/entities/Station/Table.tsx';
import SearchInputs from '@/feature/search-data/SearchInputs.tsx';
import { cn } from '@/shared/lib/cn.ts';
import Navigation from '@/widgets/Navigation/Navigation.tsx';
import Header from '@/widgets/Station/Header.tsx';

import { useState } from 'react';

const operationData = {
  contents: [
    {
      no: 1,
      evStationId: 'd66d42b0-cc3c-11ed-a718-0e6879283026',
      operatingInstitution: '아우토크립트',
      evStationName: '아우토크립트',
      address: {
        main: '서울특별시 영등포구 여의공원로 115 세우빌딩',
        detail: null,
      },
      userLimit: {
        item: 0,
        detail: null,
      },
      operatingStatus: 0,
      registerDate: '2023-03-27T10:15:18.000Z',
    },
    {
      no: 2,
      evStationId: 'df84d4d6-6047-11ef-9000-0e6879283026',
      operatingInstitution: '아우토크립트',
      evStationName: '아우토크립트 신사옥 테스트',
      address: {
        main: '서울특별시 강남구 봉은사로109길 43',
        detail: '지하 1층',
      },
      userLimit: {
        item: 0,
        detail: '',
      },
      operatingStatus: 0,
      registerDate: '2024-08-22T14:32:08.000Z',
    },
    {
      no: 3,
      evStationId: '12eb3c2d-cea2-11ed-a718-0e6879283026',
      operatingInstitution: '아우토크립트',
      evStationName: '아우토크립트 테스트 충전소',
      address: {
        main: '서울특별시 영등포구 여의공원로 115 세우빌딩',
        detail: null,
      },
      userLimit: {
        item: 0,
        detail: null,
      },
      operatingStatus: 0,
      registerDate: '2023-03-30T11:25:01.000Z',
    },
  ],
  pagination: {
    page: 1,
    rowsPerPage: 30,
    sortBy: ['ev_station.name', 'ev_station.address'],
    descending: false,
    rowsNumber: 3,
  },
  operatingStatistics: {
    operating: 3,
    pause: 0,
    stop: 0,
  },
};

export default function StationInfo() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('none');

  const toggleNavigation = () => {
    setIsNavOpen(prev => !prev);
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex">
      <div className={cn('transition-transform duration-300', !isNavOpen && 'hidden')}>
        <Navigation />
      </div>

      <div className="flex flex-col w-full items-center">
        <Header userName="유은지" toggleNavigation={toggleNavigation} />
        <div className={cn('flex flex-col gap-10 p-8 w-full')}>
          <h1 className="text-2xl font-semibold">충전소 관리</h1>
          <SearchInputs />
          <FilterButtons active={activeFilter} setActive={setActiveFilter} />
          <Table contents={operationData.contents} />
          <Pagination perPage={30} />
        </div>
      </div>
    </div>
  );
}
