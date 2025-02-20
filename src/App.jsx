import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/DashboardPage";  // Pastikan Dashboard.js ada
import LoginPage  from './pages/Login/Login';
import Passanger from './pages/Passanger/Passanger';
import TravelSchedule from './pages/Schedule/TravelSchedule';
import LandingPage from "./pages/LandingPage/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={ <Dashboard />} />
        <Route path="/passanger" element={ <Passanger /> } />
        <Route path="/travel-schedule" element={<TravelSchedule /> } />
        {/* Jika halaman tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App
