import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function Otp() {
  const [otp, setOtp] = useState(["", "", "", ""]); 
  const [error, setError] = useState("");  
  const navigate = useNavigate();

  const handleInputChange = (e, index) => {
    const value = e.target.value; 
    
   
    if (value >= "0" && value <= "9") { 
      const newOtp = otp.slice(); 
      newOtp[index] = value; 
      setOtp(newOtp); 
  

      if (value && index < 3) { 
        const nextInput = e.target.nextSibling; 
        if (nextInput) {
          nextInput.focus(); 
        }
      }
    }
  };
  
  

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join(""); 
    if (enteredOtp === "1234") {
      navigate("/dashboard");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Enter OTP</h2>
      <div className="otp-input-group">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            maxLength="1"
            className="otp-box"
          />
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleVerifyOtp} className="btn send-otp">
        Verify OTP
      </button>
    </div>
  );
}

export default Otp;

