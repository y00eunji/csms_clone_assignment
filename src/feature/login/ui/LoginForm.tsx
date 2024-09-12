import { isEmpty } from '@/feature/login/lib/validation.ts';
import LoginInput from '@/feature/login/ui/LoginInput.tsx';
import useInput from '@/shared/lib/hooks/useInput.ts';
import Button from '@/shared/ui/Button/Button.tsx';

import { useState } from 'react';

export default function LoginForm() {
  const [idValue, onIdChange] = useInput();
  const [passwordValue, onPasswordChange] = useInput();

  const [isIdEmpty, setIsIdEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const handleBlur = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: string) => {
    setter(isEmpty(value));
  };

  const handleLoginButtonClick = () => {
    if (isIdEmpty || isPasswordEmpty) return;

    // TODO: login logic
  };

  return (
    <div className="flex flex-col w-[350px] gap-2">
      <LoginInput
        placeholder="ID"
        value={idValue}
        onChange={onIdChange}
        isEmpty={isIdEmpty}
        onBlur={event => handleBlur(setIsIdEmpty, event.target.value)}
      />
      <LoginInput
        placeholder="Password"
        value={passwordValue}
        onChange={onPasswordChange}
        isEmpty={isPasswordEmpty}
        onBlur={event => handleBlur(setIsPasswordEmpty, event.target.value)}
      />
      <Button text="Log In" onClick={handleLoginButtonClick} className="bg-white text-black mt-4 font-semibold" />
    </div>
  );
}
