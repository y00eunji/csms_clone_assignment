import FilterButton, { FilterType } from '@/entities/Station/ui/FilterButton.tsx';

import React, { Dispatch, SetStateAction } from 'react';

interface IFilterButtonsProps {
  active: FilterType;
  setActive: Dispatch<SetStateAction<FilterType>>;
  counts: { operating: number; pause: number; stop: number };
}

export function FilterButtons({ active, setActive, counts }: IFilterButtonsProps) {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (active === (e.currentTarget.name as FilterType)) {
      setActive('none');
      return;
    }
    setActive(e.currentTarget.name as FilterType);
  };
  return (
    <div className="flex gap-5">
      <FilterButton
        text="운영중"
        name="operating"
        onClick={handleButtonClick}
        activeButton={active}
        count={counts.operating}
      />
      <FilterButton
        text="임시중지"
        name="pause"
        onClick={handleButtonClick}
        activeButton={active}
        count={counts.pause}
      />
      <FilterButton text="영구중지" name="stop" onClick={handleButtonClick} activeButton={active} count={counts.stop} />
    </div>
  );
}
