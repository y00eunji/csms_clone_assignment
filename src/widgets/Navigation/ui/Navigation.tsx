import { cn } from '@/shared/lib/cn.ts';
import { NAV_NAME } from '@/widgets/Navigation/model/const.ts';

import { useState } from 'react';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';

export function Navigation() {
  const [activeCategory, setActiveCategory] = useState(NAV_NAME[1]?.name || '');
  const [activeSubCategory, setActiveSubCategory] = useState(NAV_NAME[1]?.sub?.[0] || '');
  const [expandedCategory, setExpandedCategory] = useState(NAV_NAME[1]?.name || '');

  const handleCategoryClick = (name: string) => {
    if (name !== expandedCategory) {
      setExpandedCategory(name);

      const category = NAV_NAME.find(item => item.name === name);
      if (category?.sub && 0 < category.sub.length) {
        setActiveSubCategory(category.sub[0]);
      } else {
        setActiveSubCategory('');
      }
    } else {
      setExpandedCategory('');
      setActiveSubCategory('');
    }

    setActiveCategory(name);
  };

  return (
    <nav className="h-screen w-[300px] bg-[#1d2934] flex flex-col items-center p-3 pt-12  text-white">
      <img src="/nav/ci-eviq-logo.png" alt="로고" width={150} height={80} />
      <div className="w-full text-center">ver 1.0</div>
      <ul className="w-full mt-5">
        {NAV_NAME.map((item, index) => {
          const isActive = item.name === activeCategory;
          const isExpanded = item.name === expandedCategory;

          return (
            <li
              key={index}
              className={`w-full font-semibold mb-2 cursor-pointer`}
              onClick={() => handleCategoryClick(item.name)}
            >
              <div
                className={cn(
                  'flex items-center justify-between w-full p-4 rounded hover:bg-[#434C54]',
                  isActive && 'bg-[#00adff] hover:bg-[#00adff]',
                )}
              >
                <div className="flex items-center justify-center">
                  <img src={item.src} alt={item.name} className="mr-3" width={25} height={25} />
                  <span>{item.name}</span>
                </div>
                {item.sub && <span>{isExpanded ? <BiSolidUpArrow size={10} /> : <BiSolidDownArrow size={10} />}</span>}
              </div>
              {item.sub && isExpanded && (
                <ul className="mt-2 w-full">
                  {item.sub.map((subItem, subIndex) => {
                    const isSubActive = subItem === activeSubCategory;
                    return (
                      <li
                        key={subIndex}
                        className={`pl-14 p-4 w-full hover:bg-[#1a3648] ${isSubActive && 'text-[#00adff] rounded hover:text-[#00adff] hover:bg-[#1a3648]'}`}
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
