
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../Styles/Login.css';

function Login() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSendOtp = async () => {

        setError(""); 

        if (phoneNumber.length === 10 && !isNaN(phoneNumber)) {
            try {
                const response = await fetch(`https://pass-my-fule-backend.onrender.com/api/v1/login/send-otp/%2B94${phoneNumber}`, {
                    method: "POST",
                });

                if (response.ok) {
                    const result = await response.text();
                    alert(result);
                    navigate("/Otp", { state: { phoneNumber } });
                } else {
                    setError("Failed to send OTP. Please try again.");
                }
            } catch (exception) {
                setError("An error occurred while sending OTP. Please try again.");

            }
        } else {
            setError("Please enter a valid 10-digit phone number.");
        }
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
    };

    return (
        <div className="login-body">
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
        </div>
    );
}

export default Login;
