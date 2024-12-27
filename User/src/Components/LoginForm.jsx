
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';


function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
      navigate("/Otp"); 
    } else {
      setError("Please enter a valid 10-digit phone number.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <h3></h3>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          maxLength="10"
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <button onClick={handleSendOtp} className="btn send-otp">
        Send OTP
      </button>
    </div>
  );
}

export default Login;