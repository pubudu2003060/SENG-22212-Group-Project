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

    const handleVerifyOtp = async () => {
        const enteredOtp = otp.join(""); // Combine the OTP digits into a single string

        if (enteredOtp.length === 4) {
            try {

                const response = await fetch("http://localhost:8080/api/v1/login/validate-otp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        phoneNumber: "+94" + phoneNumber,
                        otp: enteredOtp,
                    }),
                });

                const result = await response.json();
                console.log(result)
                if (response.ok) {
                    alert("Login Successfull!");
                    sessionStorage.setItem("userId", result.userId)
                    sessionStorage.setItem("userContactNumber",result.contactNo)
                    sessionStorage.setItem("firstName",result.firstName)
                    sessionStorage.setItem("lastName",result.lastName)
                    sessionStorage.setItem("address",result.address)
                    sessionStorage.setItem("idNo",result.idNo)
                    navigate("/Dashboard");

                } else {
                    setError("Error validating OTP." );
                }
            } catch (error) {
                setError("An error occurred while validating OTP.");
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
        </div>
    );
}

export default Otp;