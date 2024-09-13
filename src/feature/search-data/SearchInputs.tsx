import Dropdown from '@/entities/Station/Dropdown.tsx';
import StationInput from '@/feature/search-data/StationInput.tsx';
import useInput from '@/shared/lib/hooks/useInput.ts';
import Button from '@/shared/ui/Button/Button.tsx';

import { useState } from 'react';

// TODO: Operations Name
const operations = ['전체', '에프씨엠', 'GS칼텍스', '아우토크립트', '차밥스', '아우토크립트 테스트'];

export default function SearchInputs() {
  const [stationName, onStationNameChange] = useInput();
  const [selectedOperations, setSelectedOperations] = useState<string[]>([]);

  const handleSelect = (selected: string[]) => {
    setSelectedOperations(selected);
    // TODO: 요청을 보낼 로직을 여기에 추가
  };

  return (
    <div className="w-full border border-gray-300 rounded flex justify-between px-8 bg-white p-2">
      <StationInput
        label="충전소 이름"
        value={stationName}
        onChange={onStationNameChange}
        placeholder="충전소 이름을 입력해주세요."
      />

      <Dropdown operations={operations} onSelect={handleSelect} />

      <StationInput
        label="충전소 주소"
        value={stationName}
        onChange={onStationNameChange}
        placeholder="충전소 주소를 입력해주세요."
      />
      <Button text="검색" onClick={() => console.log(1)} className="text-white bg-[#00adff]" />
    </div>
  );
}
