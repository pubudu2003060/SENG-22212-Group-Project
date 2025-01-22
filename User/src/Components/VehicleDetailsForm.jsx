import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../Styles/Registration.css";

function VehicleDetailsForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vehicleNumber: "",
        vehicleType: "Car",
        chassisNumber: "",
        fuelType: "Petrol",
        enginNumber: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({...prevErrors, [name]: ""}));
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
        // Validate form inputs
        if (!validateForm()) return;

        // Get userId from session storage
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
            alert("User ID not found. Please register personal details first.");
            navigate("/PersonalDetailsForm");
            return;
        }

        // Create the data to send
        const apiBody = {
            chassiNo: formData.chassisNumber,
            vehicalType: formData.vehicleType,
            vehicalNo: formData.vehicleNumber,
            enginNo: formData.enginNumber,
            fualType: formData.fuelType,
            user: {userId: parseInt(userId)},
        };

        try {

            // Send data to the API
            await axios.post("http://localhost:8080/api/v1/addvehical", apiBody);

            alert("Vehicle registered successfully!");
            navigate("/QRGenerator"); // Go to the next page
        } catch (error) {
            alert("Failed to register vehicle. Please try again.");
        } finally {
            setLoading(false); // Hide loading state
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
                    <button type="button" onClick={handleRegister} className="form-button" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default VehicleDetailsForm;
