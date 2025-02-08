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
    cookies.remove("token")

    // Clear other storage (if any)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to home page
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        alignItems: "center",
        padding: "5px 20px",
        marginLeft: "25px",
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
      Logout
    </button>
  );
}

export default LogoutButton;
