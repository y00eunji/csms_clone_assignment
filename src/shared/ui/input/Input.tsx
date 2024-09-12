import { cn } from '@/shared/lib/cn.ts';

import { forwardRef, InputHTMLAttributes } from 'react';

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ placeholder, value = '', onChange, onBlur, className = '', ...props }, ref) => {
    return (
      <input
        type="text"
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={cn('p-4 focus:outline-none focus:ring-1 focus:ring-white rounded-2xl', className)}
        {...props}
      />
    );
  },
);

export default Input;
