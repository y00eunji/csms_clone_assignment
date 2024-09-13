import FilterButton, { FilterType } from '@/entities/Station/FilterButton.tsx';

interface IFilterButtonsProps {
  active: FilterType;
  setActive: React.Dispatch<React.SetStateAction<FilterType>>;
}

export default function FilterButtons({ active, setActive }: IFilterButtonsProps) {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (active === (e.currentTarget.name as FilterType)) {
      setActive('none');
      return;
    }
    setActive(e.currentTarget.name as FilterType);
  };

  return (
    <div className="flex gap-5">
      <FilterButton text="운영중" name="operating" onClick={handleButtonClick} activeButton={active} count={4} />
      <FilterButton text="임시중지" name="temporary" onClick={handleButtonClick} activeButton={active} count={0} />
      <FilterButton text="영구중지" name="permanent" onClick={handleButtonClick} activeButton={active} count={0} />
    </div>
  );
}
