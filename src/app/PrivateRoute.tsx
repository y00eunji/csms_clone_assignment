import { useAuthStore } from '@/shared/model/useAuthStore';

import { Navigate, useLocation, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
