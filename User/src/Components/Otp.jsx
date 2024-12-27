
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css';  // Reuse the same style file

function Otp() {
  const [otp, setOtp] = useState("");  // Store OTP entered by the user
  const [error, setError] = useState("");  // Store any error messages
  const navigate = useNavigate();  // For navigating to the next page after OTP verification

  // Handle OTP input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setOtp(value);
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    if (otp === "1234") {  // Example OTP validation (replace with actual logic)
      navigate("/Home");  // Redirect to the Home page after successful OTP verification
    } else {
      setError("Invalid OTP. Please try again.");  // Show error if OTP is incorrect
    }
  };

  return (
    <div className="login-container"> {/* Reuse the same styling */}
      <h2>Enter OTP</h2>
      <div className="form-group">
        <label htmlFor="otp">OTP</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={handleInputChange}
          placeholder="Enter OTP"
          maxLength="6"
        />
        {error && <p className="error-message">{error}</p>} {/* Display error message if OTP is invalid */}
      </div>
      <button onClick={handleVerifyOtp} className="btn send-otp">
        Verify OTP
      </button>
    </div>
  );
}

export default Otp;
