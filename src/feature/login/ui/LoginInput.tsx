import { cn } from '@/shared/lib/cn.ts';
import Input from '@/shared/ui/input/Input.tsx';

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEmpty: boolean;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function LoginInput({ placeholder, value, onChange, isEmpty, onBlur }: InputFieldProps) {
  return (
    <div className="h-[80px] flex flex-col gap-1 items-start">
      <Input
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        value={value}
        className={cn('w-full border-2 bg-[#242424FF]', isEmpty ? 'border-red-500' : 'border-transparent')}
      />
      {isEmpty && <p className="text-[12px] text-red-600 ml-2">{placeholder}는 필수값입니다.</p>}
    </div>
  );
}
