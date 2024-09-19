import { cn } from '@/shared/lib/cn.ts';

import { MouseEventHandler } from 'react';

export type FilterType = 'operating' | 'pause' | 'stop' | 'none';

interface IFilterButtonProps {
  name: string;
  text: string;
  activeButton?: FilterType;
  onClick: MouseEventHandler<HTMLButtonElement>;
  count?: number;
}

export default function FilterButton({ name, text, count = 0, activeButton, onClick }: IFilterButtonProps) {
  return (
    <button
      name={name}
      onClick={onClick}
      className={cn(
        'border border-gray-300 p-4 w-[200px] flex justify-between items-center text-2xl rounded-2xl bg-white',
        activeButton === name && 'bg-[#d9dee2]',
      )}
    >
      <div>{text}</div> <div className={cn('font-semibold', 'stop' === name && 'text-red-600')}>{count}</div>
    </button>
  );
}
