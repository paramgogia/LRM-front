import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import DashboardLayout from './pages/dash';
import Overview from './pages/Overview';
import Credits from './pages/Credits';
import History from './pages/History';
import Profile from './pages/Profile';
// import Settings from './pages/Settings';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
          <Route index element={<Overview />} />
          <Route path="credits" element={<Credits />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
          {/* <Route path="settings" element={<Settings />} />  */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;