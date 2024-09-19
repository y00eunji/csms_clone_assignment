import { FilterType } from '@/entities/Station/FilterButton.tsx';
import Pagination from '@/entities/Station/Pagination.tsx';
import Table from '@/entities/Station/Table.tsx';
import FilterButtons from '@/feature/filter-operations/ui/FilterButtons.tsx';
import SearchInputs from '@/feature/search-data/ui/SearchInputs.tsx';
import { useGetUser } from '@/shared/api/useGetUser.ts';
import { IResponsePostStation, usePostStationList } from '@/shared/api/usePostStationList.ts';
import { cn } from '@/shared/lib/cn.ts';
import Navigation from '@/widgets/Navigation/Navigation.tsx';
import Header from '@/widgets/Station/Header.tsx';

import { useEffect, useState } from 'react';

export default function StationInfo() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('none');
  const [stationData, setStationData] = useState<IResponsePostStation | null>(null);

  const { data: userData } = useGetUser();
  const { mutate: fetchStationData, data: fetchedData } = usePostStationList();

  const toggleNavigation = () => {
    setIsNavOpen(prev => !prev);
  };

  useEffect(() => {
    fetchStationData({
      params: {
        descending: false,
        page: 1,
        rowsPerPage: 30,
      },
    });
  }, [fetchStationData]);

  useEffect(() => {
    if (fetchedData) {
      setStationData(fetchedData);
    }
  }, [fetchedData]);

  return (
    <div className="bg-gray-200 w-screen h-screen flex">
      <div className={cn('transition-transform duration-300', !isNavOpen && 'hidden')}>
        <Navigation />
      </div>

      <div className="flex flex-col w-full items-center">
        <Header userName={userData?.userId} toggleNavigation={toggleNavigation} />
        <div className={cn('flex flex-col gap-10 p-8 w-full')}>
          <h1 className="text-2xl font-semibold">충전소 관리</h1>
          <SearchInputs />
          <FilterButtons
            active={activeFilter}
            setActive={setActiveFilter}
            counts={{
              operating: stationData?.operatingStatistics.operating,
              pause: stationData?.operatingStatistics.pause,
              stop: stationData?.operatingStatistics.stop,
            }}
          />
          <Table contents={stationData?.contents || []} />
          <Pagination perPage={30} />
        </div>
      </div>
    </div>
  );
}
