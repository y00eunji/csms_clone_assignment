import { cn } from '@/shared/lib/cn.ts';
import Input from '@/shared/ui/input/Input.tsx';

import { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { MdRemoveRedEye } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';

interface InputFieldProps {
  placeholder: string;
  value: string;
  isEmpty: boolean;
  isPassword?: boolean;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  const [visible, setVisible] = useState(true);

  const handleVisible = () => {
    setVisible(prev => !prev);
  };

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
          'w-full border-2 bg-[#242424FF] p-3 text-white',
          isEmpty ? 'border-red-500' : 'border-transparent',
          isPassword ? 'pr-20' : 'pr-12',
        )}
      />
      {/* 경고 아이콘 */}
      {isEmpty && !isPassword && (
        <span className="absolute right-3 top-1/3 transform -translate-y-1/2">
          <RiErrorWarningFill size={25} className="text-red-500" />
        </span>
      )}
      {isEmpty && isPassword && (
        <span className="absolute right-12 top-1/3 transform -translate-y-1/2">
          <RiErrorWarningFill size={25} className="text-red-500" />
        </span>
      )}

      {/* 삭제 아이콘 */}
      {value && (
        <span
          className={cn('absolute top-1/3 transform -translate-y-1/2', isPassword ? 'right-10' : 'right-2')}
          onClick={onClick}
        >
          <TiDelete size={35} className="opacity-60" />
        </span>
      )}

      {/* 비밀번호 숨김 아이콘 */}
      {isPassword && (
        <span className="absolute right-3 top-1/3 transform -translate-y-1/2" onClick={handleVisible}>
          {visible ? (
            <MdRemoveRedEye size={30} className="opacity-60" />
          ) : (
            <FaEyeSlash size={30} className="opacity-60" />
          )}
        </span>
      )}

      {isEmpty && <p className="text-[12px] text-red-600 ml-2">{placeholder}는 필수값입니다.</p>}
    </div>
  );
}
