import { cn } from '@/shared/lib/cn.ts';
import Input from '@/shared/ui/input/Input.tsx';

import React, { ChangeEvent, useState } from 'react';

import { DeleteIcon, ErrorIcon, PasswordToggle } from './Icons.tsx';

interface InputFieldProps {
  placeholder: string;
  value: string;
  isEmpty: boolean;
  isPassword?: boolean;
  onClick: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export default function LoginInput({
  placeholder,
  value,
  isPassword,
  onClick,
  onChange,
  isEmpty,
  onBlur,
  onFocus,
}: InputFieldProps) {
  const [visible, setVisible] = useState(!isPassword);

  return (
    <div className="relative h-[80px] flex flex-col gap-[2px] items-start">
      <Input
        type={visible ? 'text' : 'password'}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
        className={cn(
          'w-full border-2 bg-[#242424FF] p-3 text-white placeholder:text-sm',
          isEmpty ? 'border-red-500' : 'border-transparent',
          isPassword ? 'pr-20' : 'pr-12',
        )}
      />
      {/* 아이콘 */}
      {isEmpty && <ErrorIcon isPassword={isPassword} />}
      {value && <DeleteIcon isPassword={isPassword} onClick={onClick} />}
      {isPassword && <PasswordToggle visible={visible} onClick={() => setVisible(prev => !prev)} />}
      {isEmpty && <p className="text-[12px] text-red-600 ml-2">{placeholder}는 필수값입니다.</p>}
    </div>
  );
}
