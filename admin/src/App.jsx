import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Dashboard from "./pages/Dashboard";
import Navigation from "./pages/Navigation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
