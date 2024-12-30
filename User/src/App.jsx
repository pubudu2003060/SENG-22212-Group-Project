
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './Components/LoginForm.jsx';
import Otp from './Components/Otp.jsx';
import HomePage from './Components/Home.jsx';

function App() {
 
  return (
    <Router> 
      <div>
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginForm" element={<Login/>} /> 
          <Route path="/Otp" element={<Otp />} /> 
        </Routes>
      </div>
    </Router>

  );
}

export default App;


