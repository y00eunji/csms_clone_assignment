import LoginPage from '@/pages/loginPage.tsx';
import StationList from '@/pages/stationList.tsx';

import { Route, Routes } from 'react-router-dom';

import '../App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/charging-infra/ev-station/list" element={<StationList />} />
      </Routes>
    </div>
  );
}

export default App;
