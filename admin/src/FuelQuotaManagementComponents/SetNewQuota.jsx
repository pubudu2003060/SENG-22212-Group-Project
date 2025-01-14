import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Input, Select, message, Button } from 'antd';

import mockData from '../../mockdata.json';
import "../styles/fuelQuotaManagement.css";

const { Option } = Select;

function SetNewQuota () {
    const [vehicleTypes, setVehicleTypes] = useState(mockData.vehicleType);

    //const [vehicleTypes, setVehicleTypes] = useState("");
    const [filters, setFilters] = useState({  vehicleType: "" });
    const [currentQuota, setCurrentQuota] = useState(null);
    const [newQuota, setNewQuota] = useState("");

    // Fetch data from API
    /*useEffect(() => {
        axios.get("http://localhost:8080/api/v1/getfuelstationowners")
        .then((response) => {
            setVehicleTypes(response.data);
            setFilteredStationOwners(response.data);
            console.log(response.data)
        })
        .catch((error) => console.error("Error fetching station owners:", error));
    }, []); */

    // Update `currentQuota` when a vehicle type is selected
    const handleSelectChange = (value) => { 
        setFilters((prevFilters) => ({ ...prevFilters, vehicleType: value })); 
        
        // Find the selected vehicle type and update its quota
        const selectedVehicle = vehicleTypes.find((type) => type.id === value);
        if (selectedVehicle) {
            setCurrentQuota(selectedVehicle.fuelQuota || "Not available");
        } else {
            setCurrentQuota(null);
        }
        setNewQuota(""); // Clear the new quota input
    };

    // Handle new quota input change
    const handleInputChange = (e) => {
        setNewQuota(e.target.value);
    };

    // Handle save new quota
    const handleSaveQuota = async () => {
        if (!filters.vehicleType) {
            message.error("Please select a vehicle type.");
            return;
        }

        if (!newQuota || isNaN(newQuota) || newQuota <= 0) {               //Check if newQuota is a number and greater than 0
            message.error("Please enter a valid fuel quota.");
            return;
        }

        const selectedVehicle = vehicleTypes.find(
            (type) => type.id === filters.vehicleType
        );

        if (selectedVehicle) {
            try{
                // API call to update the quota in the database
                const response = await axios.post(
                    "http://localhost:8080/api/v1/updatefuelquota",
                    {
                        vehicleTypeId: selectedVehicle.id,
                        newQuota: Number(newQuota),
                    }
                );
                
                if (response.status === 200) {
                    message.success("Fuel quota updated successfully.");
                    // Update local state
                    setVehicleTypes((prevTypes) =>
                        prevTypes.map((type) =>
                            type.id === selectedVehicle.id
                                ? { ...type, fuelQuota: Number(newQuota) }
                                : type
                            )
                        );
                        setCurrentQuota(Number(newQuota));
                        setNewQuota("");
                } else {
                    message.error("Failed to update fuel quota. Please try again.");
                }
            }catch (error) {
                console.error("Error updating fuel quota:", error);
                message.error("Failed to update fuel quota. Please try again.");
            }
        }
    };

    // Reset all fields to their initial states
    const handleReset = () => {
        setFilters({ vehicleType: "" });
        setCurrentQuota(null);
        setNewQuota("");
        message.info("Fields have been reset.");
    };

  return (
    <div className="set-new-quota_container">
        <h4 className="set-new-quota_header">Set new quota</h4>
        <label> Select Vehicle Type : </label>
        <Select 
            name="vehicleType" 
            value={filters.vehicleType} 
            onChange={handleSelectChange} 
            style={{ width: "100px" , marginLeft: "1rem", marginTop: "1rem"}}
        >
            {vehicleTypes.map ((type) => (
                <Option key={type.id} value={type.id}>
                    {type.name}
                </Option>
            ))}
        </Select>

        {/* Show the current fuel quota */}
        {currentQuota !== null && (
            <div style={{ marginTop: "1rem" }}>
            <strong>Current Fuel Quota:</strong> {currentQuota} liters
            </div>
        )}

        {/* Input for new fuel quota */}
        {filters.vehicleType && (
            <div style={{ marginTop: "1rem" }}>
                <label>Set New Fuel Quota:</label>
                <Input
                    type="number"
                    value={newQuota}
                    onChange={handleInputChange}
                    style={{ width: "25%", marginLeft: "1rem", marginBottom: "1.5rem"}}
                    placeholder="Enter new quota"
                />
                <Button
                    type="primary"
                    onClick={handleSaveQuota}
                    style={{ marginLeft: "1rem" }}
                    className="set-new-quota_button"
                >
                    Apply
                </Button>
                
                <Button
                    onClick={handleReset}
                    style={{ marginLeft: "1rem", background: "grey", color: "#fff" }}
                    className="set-new-quota_reset-button"
                >
                    Reset
                </Button>
            </div>
        )}
    </div>
  )
}

export default SetNewQuota
