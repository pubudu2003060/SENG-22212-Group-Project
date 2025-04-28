import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Registration.css";
import "../Styles/vehicalRegistration.css"

const VEHICLE_TYPES = ["CAR", "THREEWHEEL", "VAN", "LORRY", "BIKE", "TRACTOR", "BUS", "TRUCK", "OTHER"];
const FUEL_TYPES = ["PETROL", "DIESEL"];

const VehicleDetailsForm = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vehicleNumber: "",
        vehicleType: "",
        chassisNumber: "",
        fuelType: "",
        engineNumber: ""
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};
        ["vehicleNumber", "chassisNumber", "engineNumber"].forEach(field => {
            if (!formData[field].trim()) newErrors[field] = "Required";
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const userId = sessionStorage.getItem("userId");

    if (!userId){
         alert("User ID not found. Please register personal details first.");
         navigate("/")
    }

    // Handle form submission
    const handleRegister = async () => {
        if (!validateForm()) return;

        try {
            let token = sessionStorage.getItem("jwtToken")
            setLoading(true);
            const response = await axios.post("https://pass-my-fule-backend.onrender.com/api/v1/login/user/addvehical", {
                chassiNo: formData.chassisNumber,
                vehicalType: formData.vehicleType,
                vehicalNo: formData.vehicleNumber,
                enginNo: formData.engineNumber,
                fualType: formData.fuelType,
                user: { userId: parseInt(userId) }
            },{
                headers: {
                    "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                },
            });
            alert("Vehicle registered successfully!");
            navigate("/QRGenerator",{state:{vehicalNo:formData.vehicleNumber}});
        } catch (error) {
            alert("Failed to register vehicle. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container-v">
            <h1 className="form-title">Vehicle Details Registration</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                {[
                    { label: "Vehicle Number", name: "vehicleNumber" },
                    { label: "Chassis Number", name: "chassisNumber" },
                    { label: "Engine Number", name: "engineNumber" }
                ].map(({ label, name }) => (
                    <div key={name}>
                        <label>{label}:</label>
                        <input type="text" name={name} value={formData[name]} onChange={handleChange} />
                        {errors[name] && <span className="error-message">{errors[name]}</span>}
                    </div>
                ))}

                {[
                    { label: "Vehicle Type", name: "vehicleType", options: VEHICLE_TYPES },
                    { label: "Fuel Type", name: "fuelType", options: FUEL_TYPES }
                ].map(({ label, name, options }) => (
                    <div key={name}>
                        <label>{label}:</label>
                        <select name={name} value={formData[name]} onChange={handleChange}>
                            <option value="">Select {label}</option>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                ))}

                <div className="vehicle-buttons">
                    <button type="submit" onClick={handleRegister} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                    <button type="submit" onClick={()=>navigate('/dashboard')} >
                        Dashboard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VehicleDetailsForm;
