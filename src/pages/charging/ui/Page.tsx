import { EVStationTable, Pagination } from '@/entities/Station';
import { IResponsePostStation, usePostStationList } from '@/entities/Station/api/usePostStationList.ts';
import { StationOperatingStatusEnum } from '@/entities/Station/model/type.ts';
import { FilterType } from '@/entities/Station/ui/FilterButton.tsx';
import { FilterButtons } from '@/feature/filter-operations';
import { SearchInputs } from '@/feature/search-data';
import { useGetUser } from '@/shared/api/useGetUser.ts';
import { cn } from '@/shared/lib/cn.ts';
import { Navigation } from '@/widgets/Navigation';

import { useEffect, useState } from 'react';

import { Header } from 'widgets/Header';

export function ChargingInfraPage() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('none');
  const [stationData, setStationData] = useState<IResponsePostStation | null>(null);
  const [filteredData, setFilteredData] = useState<IResponsePostStation['contents']>([]);

  const { data: userData } = useGetUser();
  const { mutate: fetchStationData, data: fetchedData } = usePostStationList();

  const toggleNavigation = () => {
    setIsNavOpen(prev => !prev);
  };

  // 데이터 패칭해오기
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
      setFilteredData(fetchedData.contents);
    }
  }, [fetchedData]);

  // 필터링 버튼
  useEffect(() => {
    if (stationData) {
      let updatedContents = [...stationData.contents];

      if ('operating' === activeFilter) {
        updatedContents = updatedContents.filter(
          station => StationOperatingStatusEnum.OPERATING === station.operatingStatus,
        );
      } else if ('pause' === activeFilter) {
        updatedContents = updatedContents.filter(
          station => StationOperatingStatusEnum.PAUSE === station.operatingStatus,
        );
      } else if ('stop' === activeFilter) {
        updatedContents = updatedContents.filter(
          station => StationOperatingStatusEnum.STOP === station.operatingStatus,
        );
      }

      setFilteredData(updatedContents);
    }
  }, [activeFilter]);

  // 검색 기능
  const handleSearch = (filters: { stationName: string; stationAddress: string; selectedOperations: string[] }) => {
    if (stationData) {
      let updatedContents = [...stationData.contents];

      if (filters.stationName) {
        updatedContents = updatedContents.filter(station => station.evStationName.includes(filters.stationName));
      }

      if (filters.stationAddress) {
        updatedContents = updatedContents.filter(station => station.address.main.includes(filters.stationAddress));
      }

      if (0 < filters.selectedOperations.length && !filters.selectedOperations.includes('전체')) {
        updatedContents = updatedContents.filter(station =>
          filters.selectedOperations.includes(station.operatingInstitution),
        );
      }

      setFilteredData(updatedContents);
    }
  };

  return (
    <div className="bg-gray-200 w-screen h-screen flex">
      <div className={cn('transition-transform duration-300', !isNavOpen && 'hidden')}>
        <Navigation />
      </div>

      <div className="flex flex-col w-full items-center">
        <Header userName={userData?.userId} toggleNavigation={toggleNavigation} />
        <div className={cn('flex flex-col gap-10 p-8 w-full')}>
          <h1 className="text-2xl font-semibold">충전소 관리</h1>
          <SearchInputs onSearch={handleSearch} />
          <FilterButtons
            active={activeFilter}
            setActive={setActiveFilter}
            counts={{
              operating: stationData?.operatingStatistics.operating || 0,
              pause: stationData?.operatingStatistics.pause || 0,
              stop: stationData?.operatingStatistics.stop || 0,
            }}
          />
          <EVStationTable contents={filteredData} />
          <Pagination perPage={30} />
        </div>
      </div>
    </div>
  );
}
