import { cn } from '@/shared/lib/cn.ts';
import { useOutsideClick } from '@/shared/lib/useOutsideClick.ts';

import { useRef, useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

interface IPaginationProps {
  perPage: number;
}

export function Pagination({ perPage }: IPaginationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(perPage);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleOptionClick = (option: number) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  return (
    <div className="w-full flex justify-end">
      <div className="relative flex gap-5  justify-center items-center">
        <div>페이지 당 개수 : </div>
        <button
          onClick={toggleDropdown}
          className="bg-white p-2 rounded-[7px] w-20 text-left flex justify-between items-center"
        >
          {selectedOption}
          {isOpen ? (
            <BiSolidUpArrow size={13} className="text-gray-500" />
          ) : (
            <BiSolidDownArrow size={13} className="text-gray-500" />
          )}
        </button>

        {isOpen && (
          <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 ml-12 w-24 z-10">
            {[10, 20, 30, 50].map(page => (
              <li
                key={page}
                onClick={() => handleOptionClick(page)}
                className={cn('p-3 cursor-pointer hover:bg-gray-100', selectedOption === page && 'bg-[#f2fbff]')}
              >
                {page}
              </li>
            ))}
          </ul>
        )}
        <div>3 중 1-3</div>
      </div>
    </div>
  );
}
