import { isEmpty, isIdValid, isPasswordValid } from '@/feature/login/lib/validation.ts';
import LoginInput from '@/feature/login/ui/LoginInput.tsx';
import { usePostLogin } from '@/shared/api/usePostLogin.ts';
import useInput from '@/shared/lib/hooks/useInput.ts';
import { useAuthStore } from '@/shared/model/useAuthStore.ts';
import Button from '@/shared/ui/Button/Button.tsx';

import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const { mutate: login } = usePostLogin();
  const { login: setAuthenticated } = useAuthStore();

  const [idValue, onIdChange, , resetIdValue] = useInput();

  const [passwordValue, onPasswordChange, , resetPasswordValue] = useInput();
  const [isIdEmpty, setIsIdEmpty] = useState(false);

  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  const handleIsEmpty = (setter: Dispatch<SetStateAction<boolean>>, value: string) => {
    setter(isEmpty(value));
  };

  const handleIdFocus = () => {
    setIsIdEmpty(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordEmpty(false);
  };

  const handleIdDeleteButton = () => {
    resetIdValue();
  };

  const handlePasswordDeleteButton = () => {
    resetPasswordValue();
  };

  const handleLoginButtonClick = () => {
    if (isIdEmpty || isPasswordEmpty) return;

    if (!isIdValid(idValue) || !isPasswordValid(passwordValue)) return;

    login(
      {
        userId: idValue,
        userPassword: passwordValue,
        serviceType: import.meta.env.VITE_CSMS_SERVICE_TYPE,
      },
      {
        onSuccess: () => {
          setAuthenticated();
          navigate('/charging-infra/ev-station/list');
        },
      },
    );
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
