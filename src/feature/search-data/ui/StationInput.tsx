import { cn } from '@/shared/lib/cn.ts';
import Input from '@/shared/ui/input/Input.tsx';

import { ChangeEvent } from 'react';

interface IStationInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  placeholder: string;
  className?: string;
  label?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function StationInput({
  value,
  onClick,
  label,
  onChange,
  placeholder,
  className,
  onKeyDown,
}: IStationInputProps) {
  return (
    <div className="w-[30%] flex items-center gap-8">
      <label>{label}</label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={cn('bg-gray-200 p-3 rounded-[7px] w-[60%] placeholder:text-sm', className)}
      />
    </div>
  );
}
