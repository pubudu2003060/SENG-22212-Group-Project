
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Login from './Components/LoginForm.jsx';
import Otp from './Components/Otp.jsx';
import HomePage from './Pages/Home.jsx';
import PersonalDetailsForm from './Components/PersonalDetailsForm.jsx';
import VehicleDetailsForm from './Components/VehicleDetailsForm.jsx';
import QRGenerator from './Components/QRGenerator.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ProfileManagement from './Pages/ProfileManagement.jsx';
import VehicleInfomation from './Pages/VehicleInfomation';
import PageNotFound from "./Pages/PageNotFound.jsx";
import WebFooter from"./Components/WebFooter.jsx"



function App() {
  
 
  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/" element={<HomePage/>} />
          <Route path="/LoginForm" element={<Login/>} /> 
          <Route path="/Otp" element={<Otp />} /> 
          <Route path="/PersonalDetailsForm" element={<PersonalDetailsForm/>} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileManagement />} />
          <Route path="/vehicle-info" element={<VehicleInfomation />} />
          <Route path="/VehicleDetailsForm" element={<VehicleDetailsForm/>} /> 
          <Route path="/QRGenerator" element={<QRGenerator />} />
          <Route path="/WebFooter" element={<WebFooter/>}/>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;


