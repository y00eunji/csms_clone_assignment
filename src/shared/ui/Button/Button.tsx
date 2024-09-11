import { cn } from '@/shared/lib/cn.ts';

import { HTMLAttributes } from 'react';

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
  rightNumber?: number;
}

export default function Button({ text, onClick, rightNumber, className, ...props }: IButtonProps) {
  return (
    <button onClick={onClick} className={cn('px-5 py-3 bg-neutral-700 rounded-2xl', className)} {...props}>
      {text}
      {rightNumber && <span className="ml-2">{rightNumber}</span>}
    </button>
  );
}
