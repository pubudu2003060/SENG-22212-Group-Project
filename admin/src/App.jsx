import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navigation from "./pages/Home";
import FuelManagement from "./pages/FuelManagement";

function App() {
 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fuelManagement" element={<FuelManagement />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
