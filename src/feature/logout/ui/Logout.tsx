import { usePostLogout } from '@/feature/logout/api/usePostLogout.ts';
import { useAuthStore } from '@/shared/model/useAuthStore.ts';

import { TbLogout } from 'react-icons/tb';

export function Logout() {
  const { mutate } = usePostLogout();

  const handleLogout = () => {
    mutate(null, {
      onSuccess: () => {
        useAuthStore.getState().logout();
      },
    });
  };
  return <TbLogout size={25} onClick={handleLogout} />;
}
