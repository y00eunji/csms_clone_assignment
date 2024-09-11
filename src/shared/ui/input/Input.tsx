import { cn } from '@/shared/lib/cn.ts';

import { ChangeEvent, InputHTMLAttributes } from 'react';

interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

export default function Input({ placeholder, value = '', onChange, className = '', ...props }: IInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={cn('p-4 focus:outline-none focus:ring-1 focus:ring-white rounded-2xl', className)}
      {...props}
    />
  );
}
