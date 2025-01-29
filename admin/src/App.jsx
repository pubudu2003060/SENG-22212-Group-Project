import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navigation from "./pages/Home";
import FuelManagement from "./pages/FuelManagement";
import StationManagement from "./pages/StationManagement";
import UserManagement from "./pages/UserManagement";
import FuelQuotaManagement from "./pages/FuelQuotaManagement";
import Settings from "./pages/Settings";
import { AdminProvider } from "./components/Context";
import LogoutButton from "./components/LogoutButton";

function App() {
 
  return (
    <>
    <AdminProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fuelManagement" element={<FuelManagement />} />
          <Route path="/stationManagement" element={<StationManagement />} />
          <Route path="/userManagement" element={<UserManagement />} />
          <Route path="/fuelQuotaManagement" element={<FuelQuotaManagement />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logoutButton" element={<LogoutButton />} />
        </Routes>
      </Router>
      </AdminProvider>
    </>
  );
}

export default App;
