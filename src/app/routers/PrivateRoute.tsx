import { useAuthStore } from '@/shared/model/useAuthStore.ts';

import { Navigate, useLocation, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
