import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Registration.css";

function VehicleDetailsForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vehicleNumber: "",
        vehicleType: "Car",
        chassisNumber: "",
        fuelType: "Petrol",
        engineNumber: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [vehicleId, setVehicleId] = useState(null);

    useEffect(() => {
        const storedVehicleId = sessionStorage.getItem("vehicleId");
        if (storedVehicleId) {
            setVehicleId(storedVehicleId);
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        
        console.log(`Field changed: ${name}, New value: ${value}`);

      
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
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
 
   const handleRegister = async () => {
        if (!validateForm()) return;

        const userId = sessionStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found. Please register personal details first.");
            navigate("/PersonalDetailsForm");
            return;
        }

        const apiBody = {
            chassiNo: formData.chassisNumber,
            vehicalType: formData.vehicleType,
            vehicalNo: formData.vehicleNumber,
            enginNo: formData.engineNumber,
            fualType: formData.fuelType,
            user: { userId: parseInt(userId) },
        };

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:8080/api/v1/addvehical",
                apiBody
            );

            sessionStorage.setItem("vehicleId", response.data.vehicalId);
            setVehicleId(response.data.vehicalId);

            alert("Vehicle registered successfully!");
            navigate("/QRGenerator");
        } catch (error) {
            console.error("Error details:", error.response || error.message);
            alert("Failed to register vehicle. Please try again.");
        } finally {
            setLoading(false);
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
                <select
                    name="fuelType" 
                    className="vehicle-select"
                    value={formData.fuelType} 
                    onChange={handleChange} 
                >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                </select>


                <label className="form-label">Engine Number:</label>
                <input
                    type="text"
                    name="engineNumber"
                    className="form-input"
                    placeholder="Enter your engine number"
                    value={formData.engineNumber}
                    onChange={handleChange}
                />

                <div className="vehicle-buttons">
                    <button type="button" onClick={handleBack} className="form-button">
                        Back
                    </button>
                    <button type="button" onClick={handleRegister} className="form-button" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default VehicleDetailsForm;
