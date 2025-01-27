
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../Styles/Registration.css";

function VehicleDetailsForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vehicleNumber: "",
        vehicleType: "",
        chassisNumber: "",
        fuelType: "",
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
        if (!formData.enginNumber.trim()) {
            newErrors.enginNumber = "Engin number is required.";
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
            chassiNo: formData.chassisNumber, // Ensure it matches expected type
            vehicalType: formData.vehicleType,

            vehicalNo: formData.vehicleNumber, // Ensure it matches expected type
            enginNo: formData.engineNumber, // Corrected spelling


            fualType: formData.fuelType,
            user: { userId: parseInt(userId) } // Convert to number if backend expects number
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
        <div className="form-container-v">
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
                    <option value="CAR">Car</option>
                    <option value="THREEWHEEL">Three-Wheel</option>
                    <option value="VAN">Van</option>
                    <option value="LORRY">Lorry</option>
                    <option value="BIKE">Bike</option>
                    <option value="TRACTOR">Tractor</option>
                    <option value="BUS">Bus</option>
                    <option value="TRUCK">Truck</option>
                    <option value="OTHER">Other</option>
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


                <label className="form-label">Engine Number:</label>
                <input
                    type="text"
                    name="enginNumber"
                    className={`form-input ${errors.enginNumber ? "error-border" : ""}`}
                    placeholder="Enter your Engin number"
                    value={formData.enginNumber}
                    onChange={handleChange}
                />
                {errors.enginNumber && <span className="error-message">{errors.enginNumber}</span>}

                <label className="form-label">Fuel Type:</label>

                <select
                    name="fuelType" 
                    className="vehicle-select"
                    value={formData.fuelType} 
                    onChange={handleChange} 
                >
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
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
