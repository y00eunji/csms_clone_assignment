import LoginPage from '@/pages/loginPage.tsx';
import StationInfo from '@/pages/stationInfo.tsx';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/charging-infra/ev-station/list" element={<StationInfo />} />
      </Routes>
    </div>
  );
}

export default App;
