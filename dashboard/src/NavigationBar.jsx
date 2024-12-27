import './NavigationBar.css';

function NavigationBar() {
    return ( 
        <div>
        <nav className="navBar">
          <div className="navButtons">
            <button className="nav-btn"></button>
            <button className="nav-btn">Dashboard</button>
            <button className="nav-btn">Vehicle Registration</button>
            <button className="nav-btn">Profile</button>
          </div>
          <button className="nav-btn logout-btn">Logout</button>
        </nav>
      </div>
     );
}

export default NavigationBar;