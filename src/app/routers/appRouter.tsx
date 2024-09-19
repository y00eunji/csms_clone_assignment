import PrivateRoute from '@/app/routers/PrivateRoute.tsx';
import ChargingInfraPage from '@/pages/chargingInfraPage.tsx';
import LoginPage from '@/pages/loginPage.tsx';

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
