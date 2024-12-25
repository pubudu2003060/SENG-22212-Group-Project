import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(""); 

  const handleSendOtp = () => {
    if (phoneNumber.length === 10 && !isNaN(phoneNumber))  {
      window.location.href = "/otp.jsx";
    } else {
      setError("Please enter a valid 10-digit phone number.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value.length === 10) {
      setError("");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          value={phoneNumber}
          onChange={handleInputChange}
          placeholder="Enter 10-digit phone"
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


