import { EVStationTable, Pagination } from '@/entities/Station';
import { useGetUser } from '@/entities/Station/api/useGetUser.ts';
import { IResponsePostStation, usePostStationList } from '@/entities/Station/api/usePostStationList.ts';
import { StationOperatingStatusEnum } from '@/entities/Station/model/type.ts';
import { FilterButtons } from '@/feature/filter-operations';
import { SearchInputs } from '@/feature/search-data';
import { cn } from '@/shared/lib/cn.ts';
import { FilterType } from '@/shared/model/type.ts';
import { Navigation } from '@/widgets/Navigation';

import { useEffect, useState, useCallback } from 'react';

import { Header } from 'widgets/Header';

const getOperatingStatus = (filter: FilterType) => {
  return {
    none: StationOperatingStatusEnum.OPERATING,
    operating: StationOperatingStatusEnum.OPERATING,
    pause: StationOperatingStatusEnum.PAUSE,
    stop: StationOperatingStatusEnum.STOP,
  }[filter];
};

export function ChargingInfraPage() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterType>('none');
  const [stationData, setStationData] = useState<IResponsePostStation | null>(null);
  const [filteredData, setFilteredData] = useState<IResponsePostStation['contents']>([]);
  const [searchResults, setSearchResults] = useState<IResponsePostStation['contents'] | null>(null); // 검색된 결과를 저장할 상태

  const { data: userData } = useGetUser();
  const { mutate: fetchStationData, data: fetchedData } = usePostStationList();

  const toggleNavigation = () => setIsNavOpen(prev => !prev);

  useEffect(() => {
    fetchStationData({ params: { descending: false, page: 1, rowsPerPage: 30 } });
  }, [fetchStationData]);

  useEffect(() => {
    if (fetchedData) {
      setStationData(fetchedData);
      setFilteredData(fetchedData.contents);
      setSearchResults(fetchedData.contents);
    }
  }, [fetchedData]);

  // 필터링 로직을 함수로 분리
  const filterStations = useCallback((contents: IResponsePostStation['contents'], filter: FilterType) => {
    const operatingStatus = getOperatingStatus(filter);
    return contents.filter(station => station.operatingStatus === operatingStatus);
  }, []);

  // 필터링 처리
  useEffect(() => {
    if (searchResults) {
      // 검색 결과 내에서 필터링
      const updatedContents = filterStations(searchResults, activeFilter);
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

      setSearchResults(updatedContents); // 검색된 결과를 저장
      setFilteredData(updatedContents); // 동시에 필터링된 데이터를 갱신
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
