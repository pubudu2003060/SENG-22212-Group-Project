
import {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './Components/LoginForm.jsx';
import Otp from './Components/Otp.jsx';

function App() {
 
  return (
    <Router> 
      <div>
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/Otp" element={<Otp />} /> 
        </Routes>
      </div>
    </Router>

  );
}

export default App;


