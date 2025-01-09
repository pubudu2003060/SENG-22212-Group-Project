import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Registration.css";

function VehicleDetailsForm() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        vehicleNumber: "",
        vehicleType: "Car",
        chassisNumber: "",
        fuelType: "Petrol",
    });


    const [errors, setErrors] = useState({});

    const mockDatabase = [
        { vehicleNumber: "ABC1234", chassisNumber: "CH12345678912345" },
    ];


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

        if (!formData.vehicleNumber.trim()) {
            newErrors.vehicleNumber = "Vehicle number is required.";
        }

        if (!formData.chassisNumber.trim()) {
            newErrors.chassisNumber = "Chassis number is required.";
        }

       
        const matchingVehicle = mockDatabase.find(
            (entry) => entry.vehicleNumber === formData.vehicleNumber
        );

        if (!matchingVehicle) {
            newErrors.vehicleNumber = "Vehicle number not found in the database.";
        } else if (matchingVehicle.chassisNumber !== formData.chassisNumber) {
            newErrors.chassisNumber = "Chassis number does not match the vehicle number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    
    const handleRegister = () => {
        if (validateForm()) {
            navigate("/QRGenerator");
        }
    };

    const handleBack = () => {
        navigate("/PersonalDetailsForm");
    };

    return (
        <div className="form-container">
            <h1 className="form-title">Vehicle Details Registration</h1>
            <p className="form-subtitle">Please fill in your vehicle details to proceed.</p>

            <form>
               
                <label className="form-label">Vehicle Number:</label>
                <input
                    type="text"
                    name="vehicleNumber"
                    className={`form-input ${errors.vehicleNumber ? "error-border" : ""}`}
                    placeholder="Enter your vehicle number"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                />
                {errors.vehicleNumber && <span className="error-message">{errors.vehicleNumber}</span>}

                
                <label className="form-label">Vehicle Type:</label>
                <select
                    name="vehicleType"
                    className="vehicle-select"
                    value={formData.vehicleType}
                    onChange={handleChange}
                >
                    <option value="Car">Car</option>
                    <option value="Three-Wheeler">Three-Wheeler</option>
                    <option value="Van">Van</option>
                    <option value="Lorry">Lorry</option>
                    <option value="Bike">Bike</option>
                    <option value="Tractor">Tractor</option>
                    <option value="Bus">Bus</option>
                </select>

               
                <label className="form-label">Chassis Number:</label>
                <input
                    type="text"
                    name="chassisNumber"
                    className={`form-input ${errors.chassisNumber ? "error-border" : ""}`}
                    placeholder="Enter your chassis number"
                    value={formData.chassisNumber}
                    onChange={handleChange}
                />
                {errors.chassisNumber && <span className="error-message">{errors.chassisNumber}</span>}

              
                <label className="form-label">Fuel Type:</label>
                <select
                    name="fuelType"
                    className="vehicle-select"
                    value={formData.fuelType}
                    onChange={handleChange}
                >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                </select>

             
                <div className="vehicle-buttons">
                    <button type="button" onClick={handleBack} className="form-button">
                        Back
                    </button>
                    <button type="button" onClick={handleRegister} className="form-button">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default VehicleDetailsForm;
