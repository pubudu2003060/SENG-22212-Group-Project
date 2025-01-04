import React from "react";
import { useNavigate } from "react-router-dom";
import Image1 from "../assets/freepik__adjust__13674.png";

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="card card-body px-3 py-3 bg-">
      {/* Header */}
      <header className="bg-primary text-white text-center py-4">
        <div className="container">
          <h1 className="display-5 fw-bold">Fuel Quota Management System</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-4">
        <div className="row align-items-center justify-content-center">
          {/* Text Section */}
          <div className="col-md-5 mb-4 mb-md-0">
            <h2 className="fw-bold text-primary mb-3">
              Welcome to the Fuel Quota Management System
            </h2>
            <p className="text-secondary mb-4">
              Manage the fuel crisis efficiently with our easy-to-use platform for vehicle owners, fuel stations, and administrators.
            </p>
            <p className="mb-4">
              To get start, admins log from here.
            </p>
            <button
              onClick={handleLoginClick}
              className="btn btn-primary btn-lg"
            >
              Go to Login
            </button>
          </div>

          {/* Image Section */}
          <div className="col-md-5 text-center">
            <img
              src={Image1}
              alt="fuel management"
              className="img-fluid"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-2">
        <div className="container text-center">
          <p className="mb-0">
            &copy; 2025 Fuel Quota Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
