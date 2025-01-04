import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration.css";

function PersonalDetailsForm() {
    const navigate = useNavigate();

  
    const [formData, setFormData] = useState({
        idType: "NIC",
        idNumber: "",
        phoneNumber: "",
        firstName: "",
        lastName: "",
        address: "",
    });

 
    const [errors, setErrors] = useState({});

  
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error on change
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

   
    const goToNext = () => {
        if (validateForm()) {
            navigate("/VehicleDetailsForm");
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Personal Details Registration</h1>
            <p className="form-subtitle">Please fill in your personal details to proceed.</p>

            <form>
                
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

             
                <label className="form-label">Address:</label>
                <textarea
                    name="address"
                    className={`form-textarea ${errors.address ? "error-border" : ""}`}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChange={handleChange}
                ></textarea>
                {errors.address && <span className="error-message">{errors.address}</span>}

              
                <button type="button" onClick={goToNext} className="form-button">
                    Next
                </button>
            </form>
        </div>
    );
}

export default PersonalDetailsForm;
