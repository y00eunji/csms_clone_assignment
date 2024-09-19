import { cn } from '@/shared/lib/cn.ts';

import { FC, ReactNode } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { MdRemoveRedEye } from 'react-icons/md';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';

const IconWrapper: FC<{ className?: string; onClick?: () => void; children: ReactNode }> = ({
  className,
  onClick,
  children,
}) => (
  <span className={cn('absolute top-1/3 transform -translate-y-1/2', className)} onClick={onClick}>
    {children}
  </span>
);

export const ErrorIcon: FC<{ isPassword?: boolean }> = ({ isPassword }) => (
  <IconWrapper className={isPassword ? 'right-12' : 'right-3'}>
    <RiErrorWarningFill size={25} className="text-red-500" />
  </IconWrapper>
);

export const DeleteIcon: FC<{ isPassword?: boolean; onClick: () => void }> = ({ isPassword, onClick }) => (
  <IconWrapper className={isPassword ? 'right-10' : 'right-2'} onClick={onClick}>
    <TiDelete size={35} className="opacity-60" />
  </IconWrapper>
);

export const PasswordToggle: FC<{ visible: boolean; onClick: () => void }> = ({ visible, onClick }) => (
  <IconWrapper className="right-3" onClick={onClick}>
    {visible ? <MdRemoveRedEye size={30} className="opacity-60" /> : <FaEyeSlash size={30} className="opacity-60" />}
  </IconWrapper>
);
