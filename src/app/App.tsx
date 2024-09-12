import LoginPage from '@/pages/loginPage.tsx';
import StationList from '@/pages/stationList.tsx';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/charging-infra/ev-station/list" element={<StationList />} />
      </Routes>
    </div>
  );
}

export default App;
