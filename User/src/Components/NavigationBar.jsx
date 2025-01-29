import '../Styles/NavigationBar.css';
import { useLocation, useNavigate } from "react-router-dom";

function NavigationBar() {

  const navigate = useNavigate();
  const currentLocation = useLocation();

  const getButtonClass = (path) => {
    return currentLocation.pathname === path ? 'nav-btn active' : 'nav-btn';
  }
    
  return ( 
      <div>
        <nav className="navBar">
          <div className="navButtons">
            <button className={getButtonClass("/dashboard")}  onClick = {() => navigate("/dashboard")}>Dashboard</button>
            <button className={getButtonClass("/vehicle-info")}  onClick = {() => navigate("/vehicle-info")}>Vehicle Fuel Infomation</button>
            <button className={getButtonClass("/profile")}  onClick = {() => navigate("/profile")}>Profile</button>
          </div>
          <button className="nav-btn logout-btn" onClick = {() => navigate("/")}>Logout</button>
        </nav>
      </div>
  );
}

export default NavigationBar;