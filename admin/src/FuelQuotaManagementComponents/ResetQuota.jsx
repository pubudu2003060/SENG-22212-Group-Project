import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, message } from "antd";

function ResetQuota() {
  const [loading, setLoading] = useState(false);

  // Function to reset all quotas
  const handleResetQuota = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post("http://localhost:8080/api/v1/reset-quota");
      message.success("Fuel quotas have been reset successfully!");
      console.log(response.data); // Log response data if needed
    } catch (error) {
      console.error("Error resetting quotas:", error);
      message.error("Failed to reset quotas. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <h1>Reset Fuel Quotas</h1>
      <Button 
        type="primary"
        onClick={handleResetQuota} 
        disabled={loading}
        danger
        style = {{marginTop: "0.5rem"}}
      >
        {loading ? "Resetting..." : "Reset All Quotas"}
      </Button>
    </div>
  );
}

export default ResetQuota;
