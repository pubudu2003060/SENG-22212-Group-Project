import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Registration.css";

// Constants
const VEHICLE_TYPES = {
    CAR: "CAR",
    THREEWHEEL: "THREEWHEEL",
    VAN: "VAN",
    LORRY: "LORRY",
    BIKE: "BIKE",
    TRACTOR: "TRACTOR",
    BUS: "BUS",
    TRUCK: "TRUCK",
    OTHER: "OTHER"
};

const FUEL_TYPES = {
    PETROL: "PETROL",
    DIESEL: "DIESEL"
};

const INITIAL_FORM_STATE = {
    vehicleNumber: "",
    vehicleType: "",
    chassisNumber: "",
    fuelType: "",
    engineNumber: ""
};

const VehicleDetailsForm = () => {
    const navigate = useNavigate();

    // State management
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [vehicleId, setVehicleId] = useState(null);

    // Load vehicle ID from session storage
    useEffect(() => {
        const storedVehicleId = sessionStorage.getItem("vehicleId");
        if (storedVehicleId) {
            setVehicleId(storedVehicleId);
        }
    }, []);

    // Form validation rules
    const validateForm = () => {
        const newErrors = {};
        const requiredFields = {
            vehicleNumber: "Vehicle number",
            chassisNumber: "Chassis number",
            engineNumber: "Engine number"
        };

        Object.entries(requiredFields).forEach(([field, label]) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = `${label} is required.`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Event handlers
    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
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
            user: { userId: parseInt(userId) }
        };

        console.log(apiBody)

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:8080/api/v1/login/addvehical",
                apiBody
            );

            if (response.status === 200) {
                const { vehicleId } = response.data;
                sessionStorage.setItem("vehicleId", vehicleId);
                setVehicleId(vehicleId);
                alert("Vehicle registered successfully!");
                navigate("/QRGenerator");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to register vehicle. Please try again.";
            console.error("Registration error:", error);
            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Form field component
    const FormField = ({ label, name, type = "text", options, error }) => (
        <>
            <label className="form-label">{label}:</label>
            {type === "select" ? (
                <select
                    name={name}
                    className="vehicle-select"
                    value={formData[name]}
                    onChange={handleChange}
                >
                    {Object.entries(options).map(([value, label]) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type="text"
                    name={name}
                    className={`form-input ${error ? "error-border" : ""}`}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    value={formData[name]}
                    onChange={handleChange}
                />
            )}
            {error && <span className="error-message">{error}</span>}
        </>
    );

    return (
        <div className="form-container-v">
            <h1 className="form-title">Vehicle Details Registration</h1>
            <p className="form-subtitle">Please fill in your vehicle details to proceed.</p>

            <form onSubmit={(e) => e.preventDefault()}>
                <FormField
                    label="Vehicle Number"
                    name="vehicleNumber"
                    error={errors.vehicleNumber}
                />

                <FormField
                    label="Vehicle Type"
                    name="vehicleType"
                    type="select"
                    options={VEHICLE_TYPES}
                />

                <FormField
                    label="Chassis Number"
                    name="chassisNumber"
                    error={errors.chassisNumber}
                />

                <FormField
                    label="Engine Number"
                    name="engineNumber"
                    error={errors.engineNumber}
                />

                <FormField
                    label="Fuel Type"
                    name="fuelType"
                    type="select"
                    options={FUEL_TYPES}
                />

                <div className="vehicle-buttons">
                    <button
                        type="button"
                        onClick={() => navigate("/PersonalDetailsForm")}
                        className="form-button"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        onClick={handleRegister}
                        className="form-button"
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VehicleDetailsForm;