import PrivateRoute from '@/app/PrivateRoute.tsx';
import ChargingInfraPage from '@/pages/chargingInfraPage.tsx';
import LoginPage from '@/pages/loginPage.tsx';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/charging-infra/ev-station/list" element={<ChargingInfraPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
