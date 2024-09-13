import { cn } from '@/shared/lib/cn.ts';
import { NAV_NAME } from '@/widgets/Navigation/constants/navName.ts';

import { useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

export default function Navigation() {
  // Setting default states for active and expanded categories
  const [activeCategory, setActiveCategory] = useState('충전인프라 관리');
  const [activeSubCategory, setActiveSubCategory] = useState('충전소 관리');
  const [expandedCategory, setExpandedCategory] = useState('충전인프라 관리');

  const handleCategoryClick = (name: string) => {
    if (name !== expandedCategory) {
      setExpandedCategory(name);
    } else {
      setExpandedCategory('');
    }
    setActiveCategory(name);
    if (!NAV_NAME.find(item => item.name === name)?.sub) setActiveSubCategory('');
  };

  return (
    <nav className="h-screen w-[300px] bg-[#1d2934] flex flex-col items-center p-3 pt-12">
      <img src="/nav/ci-eviq-logo.png" alt="로고" width={150} height={80} />
      <div className="w-full text-center text-white">ver 1.0</div>
      <ul className="w-full mt-5">
        {NAV_NAME.map((item, index) => {
          const isActive = item.name === activeCategory;
          const isExpanded = item.name === expandedCategory;

          return (
            <li
              key={index}
              className={`w-full text-gray-300 font-semibold mb-2 hover:text-white cursor-pointer`}
              onClick={() => handleCategoryClick(item.name)}
            >
              <div
                className={cn(
                  'flex items-center justify-between w-full px-4 py-2 rounded',
                  isActive && 'bg-[#00adff] text-white',
                )}
              >
                <div className="flex items-center justify-center">
                  <img src={item.src} alt={item.name} className="mr-3" width={20} height={20} />
                  <span>{item.name}</span>
                </div>
                {item.sub && <span>{isExpanded ? <BiSolidUpArrow size={10} /> : <BiSolidDownArrow size={10} />}</span>}
              </div>
              {item.sub && isExpanded && (
                <ul className="ml-8 mt-2">
                  {item.sub.map((subItem, subIndex) => {
                    const isSubActive = subItem === activeSubCategory;
                    return (
                      <li
                        key={subIndex}
                        className={`p-2 ${isSubActive && 'bg-[#1a3648] text-[#00adff] rounded hover:text-[#00adff]'} hover:text-white`}
                        onClick={e => {
                          e.stopPropagation();
                          setActiveSubCategory(subItem);
                        }}
                      >
                        {subItem}
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
