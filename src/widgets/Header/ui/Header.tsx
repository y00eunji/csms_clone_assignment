import { Logout } from '@/feature/logout';

import { RxHamburgerMenu } from 'react-icons/rx';

interface IHeaderProps {
  userName: string | undefined;
  toggleNavigation: () => void;
}

export function Header({ userName, toggleNavigation }: IHeaderProps) {
  return (
    <div className="w-full flex justify-between p-3">
      <RxHamburgerMenu size={25} onClick={toggleNavigation} className="cursor-pointer" />
      <div className="flex justify-center items-center gap-3">
        <img src="/ic-account.png" alt="프로필 이미지" width={30} height={30} />
        <div>{userName}</div>
        <Logout />
      </div>
    </div>
  );
}
