import { cn } from '@/shared/lib/cn.ts';
import { useOutsideClick } from '@/shared/lib/useOutsideClick.ts';

import { useState, useEffect, useRef, useMemo } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

interface IDropdownProps {
  operations: string[];
  onSelect: (selected: string[]) => void;
}

const DEFAULT_OPTION = '전체';

export default function Dropdown({ operations, onSelect }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([DEFAULT_OPTION]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleOptionClick = (option: string) => {
    if (option === DEFAULT_OPTION) {
      setSelectedOptions([DEFAULT_OPTION]);
      setIsOpen(false);
    } else {
      setSelectedOptions(prev => {
        if (prev.includes(DEFAULT_OPTION)) return [option];
        return prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option];
      });
    }
  };

  const displaySelectedText = useMemo(() => {
    if (1 === selectedOptions.length) {
      return (
        <span className="bg-[#00adff] bg-opacity-40 p-1 rounded flex items-center w-fit">{selectedOptions[0]}</span>
      );
    }
    return (
      <div className="flex items-center">
        <span className="bg-[#00adff] bg-opacity-40 p-1 rounded flex items-center">{selectedOptions[0]}</span>
        <span className="ml-1 text-gray-600 bg-[#00adff] bg-opacity-40 p-1 rounded flex items-center">
          외 {selectedOptions.length - 1}
        </span>
      </div>
    );
  }, [selectedOptions]);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions, onSelect]);

  return (
    <div className="relative w-[30%]" ref={dropdownRef}>
      <div className="flex gap-8 items-center">
        <label>운영기관</label>
        <button
          onClick={toggleDropdown}
          className="bg-gray-200 p-2 rounded-[7px] w-[70%] text-left flex justify-between items-center"
        >
          {displaySelectedText}
          {isOpen ? (
            <BiSolidUpArrow size={13} className="text-gray-500" />
          ) : (
            <BiSolidDownArrow size={13} className="text-gray-500" />
          )}
        </button>
      </div>

      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md mt-1 ml-2 w-[70%] z-10 left-20">
          {operations.map((operation, index) => (
            <li
              key={index}
              onClick={() => handleOptionClick(operation)}
              className={cn(
                'p-3 cursor-pointer hover:bg-gray-100',
                selectedOptions.includes(operation) && 'bg-[#f2fbff] text-[#00adff]',
              )}
            >
              {operation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
