import React from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../assets/Petrol-Pump-PNG-Transparent-Image.png";
import logo from "../assets/lastfuel.png";
//import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
    <div className="home_card">

      {/*logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="home_row">
        <div className="main">
          {/* Header */}
          <header>
            <div className="home_header">
              <h1>Fuel Quota</h1><h2>Management System</h2>
            </div>
          </header>

          {/* Text Section */}
          <div className="home_text-section">
            <p>
                Manage the fuel crisis efficiently with our easy-to-use platform
                for vehicle owners, fuel stations, and administrators.
            </p>
            <p>To get started, admins log in from here.</p>
            <button onClick={handleLoginClick}>Go to Login</button>
          </div>
        </div>

        {/* Image Section */}
        <div className="home_image-section">
          <img src={Image1} alt="fuel management" />
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
