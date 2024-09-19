import Dropdown from '@/feature/search-data/ui/Dropdown.tsx';
import StationInput from '@/feature/search-data/ui/StationInput.tsx';
import { useGetOperatingInstitution } from '@/shared/api/useGetOperatingInstitution.ts';
import useInput from '@/shared/lib/hooks/useInput.ts';
import Button from '@/shared/ui/Button/Button.tsx';

import { useState } from 'react';

interface SearchInputsProps {
  onSearch: (filters: { stationName: string; stationAddress: string; selectedOperations: string[] }) => void;
}

export default function SearchInputs({ onSearch }: SearchInputsProps) {
  const [stationName, setStationNameChange] = useInput('');
  const [stationAddress, setStationAddressChange] = useInput('');
  const [selectedOperations, setSelectedOperations] = useState<string[]>([]);
  const { data: operations = [], isLoading, isError } = useGetOperatingInstitution();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const operationsWithAll = ['전체', ...operations.map(op => op.label)];

  const handleSelect = (selected: string[]) => {
    setSelectedOperations(selected);
  };

  const handleSearchButton = () => {
    onSearch({
      stationName,
      stationAddress,
      selectedOperations,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ('Enter' === event.key) {
      handleSearchButton();
    }
  };

  return (
    <div className="w-full border border-gray-300 rounded flex justify-between px-8 bg-white p-2">
      <StationInput
        label="충전소 이름"
        value={stationName}
        onChange={setStationNameChange}
        placeholder="충전소 이름을 입력해주세요."
        onKeyDown={handleKeyDown}
      />

      <Dropdown operations={operationsWithAll} onSelect={handleSelect} />

      <StationInput
        label="충전소 주소"
        value={stationAddress}
        onChange={setStationAddressChange}
        placeholder="충전소 주소를 입력해주세요."
        onKeyDown={handleKeyDown}
      />
      <Button text="검색" onClick={handleSearchButton} className="text-white bg-[#00adff]" />
    </div>
  );
}
