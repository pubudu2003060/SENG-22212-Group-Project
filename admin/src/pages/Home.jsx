import React from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../assets/freepik__adjust__13674.png";
import Footer from "../components/Footer";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="home_card">
      {/* Header */}
      <header>
        <div className="home_header">
          <h1>Fuel Quota Management System</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="home_container">
        <div className="home_row">
          {/* Text Section */}
          <div className="home_text-section">
            <h2>Welcome to the Fuel Quota Management System</h2>
            <p>
              Manage the fuel crisis efficiently with our easy-to-use platform
              for vehicle owners, fuel stations, and administrators.
            </p>
            <p>To get started, admins log in from here.</p>
            <button onClick={handleLoginClick}>Go to Login</button>
          </div>

          {/* Image Section */}
          <div className="home_image-section">
            <img src={Image1} alt="fuel management" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
