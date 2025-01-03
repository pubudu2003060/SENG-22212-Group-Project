import './NavigationBar.css';
import { useNavigate } from "react-router-dom";

function NavigationBar() {

  const navigate = useNavigate();
    
  return ( 
      <div>
        <nav className="navBar">
          <div className="navButtons">
            <button className="nav-btn"></button>
            <button className="nav-btn" id = "dashboard-btn" onClick = {() => navigate("/dashboard")}>Dashboard</button>
            <button className="nav-btn" id = "vehicleInfo-btn" onClick = {() => navigate("/vehicle-info")}>Vehicle Infomation</button>
            <button className="nav-btn" id = "profile-btn" onClick = {() => navigate("/profile")}>Profile</button>
          </div>
          <button className="nav-btn logout-btn" onClick = {() => navigate("/")}>Logout</button>
        </nav>
      </div>
  );
}

export default NavigationBar;