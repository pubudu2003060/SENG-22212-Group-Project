
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './Components/LoginForm.jsx';
import Otp from './Components/Otp.jsx';
import HomePage from './Components/Home.jsx';
import Dashboard from './Dashboard.jsx';
import ProfileManagement from './ProfileManagement.jsx';
import VehicleInfomation from './VehicleInfomation.jsx';
import PageNotFound from "./PageNotFound";

function App() {
 
  return (
    <Router> 
      <div>
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/LoginForm" element={<Login/>} /> 
          <Route path="/Otp" element={<Otp />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileManagement />} />
          <Route path="/vehicle-info" element={<VehicleInfomation />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;


