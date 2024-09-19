import PrivateRoute from '@/app/routers/PrivateRoute.tsx';
import { ChargingInfraPage } from '@/pages/charging';
import { LoginPage } from '@/pages/login';

import { Route, Routes } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/charging-infra/ev-station/list" element={<ChargingInfraPage />} />
      </Route>
    </Routes>
  );
}
