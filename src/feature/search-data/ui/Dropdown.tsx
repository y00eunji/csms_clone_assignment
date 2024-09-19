import { useState, useEffect, useRef } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

interface IDropdownProps {
  operations: string[];
  onSelect: (selected: string[]) => void;
}

export default function Dropdown({ operations, onSelect }: IDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['전체']);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleOptionClick = (option: string) => {
    if ('전체' === option) {
      setSelectedOptions(['전체']);
      setIsOpen(false);
    } else {
      setSelectedOptions(prev => {
        if (prev.includes('전체')) {
          return [option];
        }

        if (prev.includes(option)) {
          return prev.filter(item => item !== option);
        } else {
          return [...prev, option];
        }
      });
    }
  };

  const displaySelectedText = () => {
    if (1 === selectedOptions.length)
      return (
        <span className="bg-[#00adff] bg-opacity-40 p-1 rounded flex items-center w-fit">{selectedOptions[0]}</span>
      );
    if (0 === selectedOptions.length) {
      setSelectedOptions(['전체']);
      return;
    }
    return (
      <div className="flex items-center">
        <span className="bg-[#00adff] bg-opacity-40 p-1 rounded flex items-center">{selectedOptions[0]}</span>
        <span className="ml-1 text-gray-600 bg-[#00adff] bg-opacity-40 p-1 rounded flex items-center">
          외 {selectedOptions.length - 1}
        </span>
      </div>
    );
  };

  // 모달 외부를 클릭하면 닫히게 하는 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 선택된 옵션이 변경될 때 상위 컴포넌트로 전달
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
          {displaySelectedText()}
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
              className={`p-3 cursor-pointer hover:bg-gray-100  ${
                selectedOptions.includes(operation) && 'bg-[#f2fbff] text-[#00adff]'
              }`}
            >
              {operation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
