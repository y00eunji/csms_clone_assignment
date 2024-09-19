import PrivateRoute from '@/app/PrivateRoute.tsx';
import LoginPage from '@/pages/loginPage.tsx';
import StationInfo from '@/pages/stationInfo.tsx';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/charging-infra/ev-station/list" element={<StationInfo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
