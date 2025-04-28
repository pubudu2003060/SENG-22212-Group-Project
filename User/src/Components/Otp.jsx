import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import "../Styles/Login.css";

function Otp() {

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [error, setError] = useState("");
    const location = useLocation();
    const phoneNumber = location.state?.phoneNumber; // Get the phone number
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

    const handleClearOtp = () => {
        setOtp(["", "", "", ""]);
        setError(""); // Clear any error message
    };

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join(""); // Combine the OTP digits into a single string

        if (enteredOtp.length === 4) {
            try {
                const response = await fetch("https://pass-my-fule-backend.onrender.com/api/v1/login/validate-otp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phoneNumber: "+94" + phoneNumber,
                        otp: enteredOtp,
                    }),
                });

                // Parse the response as JSON
                const result = await response.json();
                console.log("Full Response:", result); // Debugging

                if (response.ok) {
                    alert("Login Successful!");

                    // Store token and user data in sessionStorage
                    sessionStorage.setItem("jwtToken", result.token);
                    sessionStorage.setItem("userId", result.data.userId);
                    sessionStorage.setItem("userContactNumber", result.data.contactNo);
                    sessionStorage.setItem("firstName", result.data.firstName);
                    sessionStorage.setItem("lastName", result.data.lastName);
                    sessionStorage.setItem("address", result.data.address);
                    sessionStorage.setItem("idNo", result.data.idNo);

                    navigate("/Dashboard");
                } else {
                    setError("Error validating OTP.");
                }
            } catch (error) {
                setError("An error occurred while validating OTP.");
                console.error("Fetch Error:", error);
            }

        } else {
            setError("Please enter a valid 4-digit OTP.");
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
            <button onClick={handleClearOtp} className="btn clear-otp">
                Clear OTP
            </button>
        </div>
    );
}

export default Otp;