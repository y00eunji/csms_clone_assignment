import { isEmpty } from '@/feature/login/lib/validation.ts';
import LoginInput from '@/feature/login/ui/LoginInput.tsx';
import useInput from '@/shared/lib/hooks/useInput.ts';
import Button from '@/shared/ui/Button/Button.tsx';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();

  const [idValue, onIdChange, , resetIdValue] = useInput();
  const [passwordValue, onPasswordChange, , resetPasswordValue] = useInput();

  const [isIdEmpty, setIsIdEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const handleIsEmpty = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: string) => {
    setter(isEmpty(value));
  };

  const handleIdFocus = () => {
    setIsIdEmpty(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordEmpty(false);
  };

  const handleLoginButtonClick = () => {
    if (isIdEmpty || isPasswordEmpty) return;

    // TODO: login logic

    // 로그인 성공 시 충전소 관리 페이지로 이동
    navigate('/charging-infra/ev-station/list');
  };

  const handleIdDeleteButton = () => {
    resetIdValue();
  };

  const handlePasswordDeleteButton = () => {
    resetPasswordValue();
  };

  return (
    <div className="flex flex-col w-[350px] gap-1">
      <LoginInput
        placeholder="ID"
        value={idValue}
        isEmpty={isIdEmpty}
        onClick={handleIdDeleteButton}
        onChange={onIdChange}
        onFocus={handleIdFocus}
        onBlur={event => handleIsEmpty(setIsIdEmpty, event.target.value)}
      />
      <LoginInput
        placeholder="Password"
        value={passwordValue}
        isEmpty={isPasswordEmpty}
        isPassword={true}
        onClick={handlePasswordDeleteButton}
        onChange={onPasswordChange}
        onFocus={handlePasswordFocus}
        onBlur={event => handleIsEmpty(setIsPasswordEmpty, event.target.value)}
      />
      <Button text="Log In" onClick={handleLoginButtonClick} className="bg-white text-black mt-4 font-semibold " />
    </div>
  );
}
