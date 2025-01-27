import React from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";
import { LogoutOutlined } from "@ant-design/icons";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies
    cookies.remove("adminEmail");
    cookies.remove("adminUserName");

    // Clear other storage (if any)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "5px 20px",
        margin: "20px",
        fontSize: "16px",
        color: "white",
        backgroundColor: "#ff4d4f", // Ant Design red color
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff7875")} // Hover color
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4f")} // Default color
    >
      <LogoutOutlined />
      Logout
    </button>
  );
}

export default LogoutButton;
