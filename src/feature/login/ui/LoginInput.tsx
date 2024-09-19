import { cn } from '@/shared/lib/cn.ts';
import Input from '@/shared/ui/input/Input.tsx';

import { ChangeEvent, FC, ReactNode, useState } from 'react';
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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

const IconWrapper: FC<{ className?: string; onClick?: () => void; children: ReactNode }> = ({
  className,
  onClick,
  children,
}) => (
  <span className={cn('absolute top-1/3 transform -translate-y-1/2', className)} onClick={onClick}>
    {children}
  </span>
);

const ErrorIcon: FC<{ isPassword?: boolean }> = ({ isPassword }) => (
  <IconWrapper className={isPassword ? 'right-12' : 'right-3'}>
    <RiErrorWarningFill size={25} className="text-red-500" />
  </IconWrapper>
);

const DeleteIcon: FC<{ isPassword?: boolean; onClick: () => void }> = ({ isPassword, onClick }) => (
  <IconWrapper className={isPassword ? 'right-10' : 'right-2'} onClick={onClick}>
    <TiDelete size={35} className="opacity-60" />
  </IconWrapper>
);

const PasswordToggle: FC<{ visible: boolean; onClick: () => void }> = ({ visible, onClick }) => (
  <IconWrapper className="right-3" onClick={onClick}>
    {visible ? <MdRemoveRedEye size={30} className="opacity-60" /> : <FaEyeSlash size={30} className="opacity-60" />}
  </IconWrapper>
);

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
