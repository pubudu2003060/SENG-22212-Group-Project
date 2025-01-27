import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration.css";
import axios from "axios";

function PersonalDetailsForm() {
    const navigate = useNavigate();



    const [formData, setFormData] = useState({
        idType: "NIC",
        idNumber: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        address: "",
        OTP: "",
    });

    console.log(formData.phoneNumber)

    const [errors, setErrors] = useState({});
    const [sentOTP, setSentOTP] = useState(""); // Stores the sent OTP
    const [isVerified, setIsVerified] = useState(false); // Tracks verification status

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        const { idType, idNumber, phoneNumber, firstName, lastName, address } = formData;

        if (idType === "NIC") {
            const oldNicRegex = /^\d{9}[Vv]$/;
            const newNicRegex = /^\d{12}$/;
            if (!oldNicRegex.test(idNumber) && !newNicRegex.test(idNumber)) {
                newErrors.idNumber = "Invalid NIC. Old NIC: 9 digits + V/v. New NIC: 12 digits.";
            }
        } else if (idType === "Passport" && idNumber.length < 6) {
            newErrors.idNumber = "Passport number must be at least 6 characters.";
        } else if (idType === "BRN" && !/^\d{6}$/.test(idNumber)) {
            newErrors.idNumber = "BRN must be exactly 6 digits.";
        }

        if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
        }

        if (!firstName.trim()) {
            newErrors.firstName = "First Name is required.";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last Name is required.";
        }

        if (!address.trim()) {
            newErrors.address = "Address is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const sendOTP = () => {
        axios
            .post(`http://localhost:8080/api/v1/login/send-otp/su/%2B94${formData.phoneNumber}`)
            .then((response) => {

                if(response.status == 200){
                    alert("OTP sent successfully!");
                }else {
                    alert("Otp sent unsuccessfully! ")
                }

            })
            .catch((err) => {
                alert("Failed to send OTP."+err);
            });
    };

    const verifyOTP = () => {
        axios
            .post("http://localhost:8080/api/v1/login/validate-otp", {
                phoneNumber: "+94"+formData.phoneNumber,
                otp: formData.OTP,
            })
            .then((response) => {
                console.log(response.data)
                if (response.data === "OTP verified successfully") {
                    setIsVerified(true);
                    alert("OTP verified successfully!");
                } else {
                    setIsVerified(false);
                    alert("Invalid OTP. "+response.data);
                }
            })
            .catch((err) => {

                alert("Failed to verify OTP. ");
            });
    };
    
    const saveUserData = () => {
        axios
            .post("http://localhost:8080/api/v1/adduser", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                contactNo: "+94"+formData.phoneNumber,
                address: formData.address,
                identityType: formData.idType,
                idNo: formData.idNumber,
            })
            .then((response) => {
                console.log("User data saved:", response.data);
    
                // Store userId in session storage
                sessionStorage.setItem("userId", response.data.userId);
                sessionStorage.setItem("userPhoneNumber",response.data.phoneNumber)

                alert("Registration successful!");
                navigate("/VehicleDetailsForm");
            })
            .catch((err) => {
                console.error("Error saving user data:", err);
                alert("Failed to save user data. Please try again.");
            });
    };
    

    const goToNext = () => {
        if (validateForm() && isVerified) {
            saveUserData();
        } else if (!isVerified) {
            alert("Please verify your OTP before proceeding.");
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Personal Details Registration</h1>
            <p className="form-subtitle">Please fill in your Personal details to proceed.</p>
            <form>
                {/* ID Type */}
                <label className="form-label">Select ID Type:</label>
                <select
                    name="idType"
                    className={`form-input ${errors.idType ? "error-border" : ""}`}
                    value={formData.idType}
                    onChange={handleChange}
                >
                    <option value="NIC">NIC</option>
                    <option value="Passport">Passport</option>
                    <option value="BRN">BRN</option>
                </select>
                {errors.idType && <span className="error-message">{errors.idType}</span>}

                {/* ID Number */}
                <label className="form-label">ID Number:</label>
                <input
                    type="text"
                    name="idNumber"
                    className={`form-input ${errors.idNumber ? "error-border" : ""}`}
                    placeholder="Enter your ID number"
                    value={formData.idNumber}
                    onChange={handleChange}
                />
                {errors.idNumber && <span className="error-message">{errors.idNumber}</span>}

                {/* First Name */}
                <label className="form-label">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    className={`form-input ${errors.firstName ? "error-border" : ""}`}
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}

                {/* Last Name */}
                <label className="form-label">Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    className={`form-input ${errors.lastName ? "error-border" : ""}`}
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}

                {/* Address */}
                <label className="form-label">Address:</label>
                <textarea
                    name="address"
                    className={`form-textarea ${errors.address ? "error-border" : ""}`}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                ></textarea>
                {errors.address && <span className="error-message">{errors.address}</span>}

                {/* Phone Number */}
                <label className="form-label">Phone Number:</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    className={`form-input ${errors.phoneNumber ? "error-border" : ""}`}
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />
                {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}

                {/* OTP Section */}
                <button type="button" onClick={sendOTP} className="form-button-before">
                    Send OTP
                </button>
                <p className="profile-p">Please verify your phone number through the OTP code we have sent.</p>
                <label className="form-label">OTP:</label>
                <input
                    type="text"
                    name="OTP"
                    className="form-input"
                    placeholder="Enter OTP"
                    value={formData.OTP}
                    onChange={handleChange}
                />
                <button type="button" onClick={verifyOTP} className="form-button-before">
                    Verify OTP
                </button>

                {/* Next Button */}
                <button
                    type="button"
                    onClick={goToNext}
                    className={`form-button ${!isVerified ? "disabled-button" : ""}`}
                    disabled={!isVerified}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default PersonalDetailsForm;
