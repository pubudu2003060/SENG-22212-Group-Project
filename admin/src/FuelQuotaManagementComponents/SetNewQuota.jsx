import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Select, message, Button } from "antd";
import { useNavigate } from "react-router-dom";

import "../styles/fuelQuotaManagement.css";
import cookies from "js-cookie";

const { Option } = Select;

function SetNewQuota() {
  let token = cookies.get("token");
  if (!token) {
    console.error("Token not found in cookies!");
    navigate("/login");
  }
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [uniqueVehicleTypes, setUniqueVehicleTypes] = useState([]);
  const [filters, setFilters] = useState({ vehicleType: "" });
  const [currentQuota, setCurrentQuota] = useState(null);
  const [newQuota, setNewQuota] = useState("");
  const navigate = useNavigate();

  // Fetch all unique vehicle types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pass-my-fule-backend.onrender.com/api/v1/admin/getallcustomerquota");
  
        // Transform data into the required format
        const transformedData = response.data.map((item) => ({
          vehicalId: item.vehical.vehicalId,
          vehicalType: item.vehical.vehicalType,
          eligibleFuelQuota: item.eligibleFuelQuota,
        }));
        setVehicleTypes(transformedData);
  
        // Extract unique vehicle types
        const uniqueTypes = Array.from(
          new Set(transformedData.map((item) => item.vehicalType))
        );
        setUniqueVehicleTypes(uniqueTypes);
  
      } catch (error) {
        console.error("Error fetching eligible fuel quotas:", error);
    //    navigate("/details-not-found");
      }
    };
  
    fetchData();
  }, [navigate]);
  

  // Update `currentQuota` when a vehicle type is selected
  const handleSelectChange = async (value) => {
    setFilters((prevFilters) => ({ ...prevFilters, vehicleType: value }));
  
    try {
      // Fetch the current quota for the selected vehicle type
      const response = await axios.get("https://pass-my-fule-backend.onrender.com/api/v1/admin/getFuelQuotaByVehicleType", {
        params: { vehicalType: value },
      });
      setCurrentQuota(response.data || "Not available");
    } catch (error) {
      console.error("Error fetching fuel quota:", error);
      setCurrentQuota(null);
   //   navigate("/details-not-found");
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

    if (!newQuota || isNaN(newQuota) || newQuota <= 0) {
      // Check if newQuota is a number and greater than 0
      message.error("Please enter a valid fuel quota.");
      return;
    }

    try {
      // API call to update the quota in the database using URL parameters
      const response = await axios.put(
        `https://pass-my-fule-backend.onrender.com/api/v1/updateFuelQuotaByVehicleType`,
        {
          vehicleType: filters.vehicleType.toUpperCase(), // Move these from params to body
          fuelQuantity: Number(newQuota),
        }
      );
      console.log(response); // Log the entire response object

      if (response.status === 200) {
        message.success("Fuel quota updated successfully.");
        setCurrentQuota(Number(newQuota));
        setNewQuota("");
      } else {
        message.error("Failed to update fuel quota. Please try again.");
      }
    } catch (error) {
      console.error("Error updating fuel quota:", error);
      message.error("Failed to update fuel quota. Please try again.");
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
      <label>Select Vehicle Type:</label>
      <Select
        name="vehicleType"
        value={filters.vehicleType}
        onChange={handleSelectChange}
        style={{ width: "100px", marginLeft: "1rem", marginTop: "1rem" }}
      >
        {uniqueVehicleTypes.map((type) => (
          <Option key={type} value={type}>
            {type}
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
            style={{ width: "25%", marginLeft: "1rem", marginBottom: "1.5rem" }}
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
  );
}

export default SetNewQuota;
