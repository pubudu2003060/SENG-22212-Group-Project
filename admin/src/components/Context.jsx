// src/context/AdminContext.js
import React, { createContext, useState, useEffect } from 'react';
import cookies from 'js-cookie';

// Create the context
const AdminContext = createContext();

// Create a provider to wrap your app
export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({ userName: '' });

  useEffect(() => {
    // Check cookies and set the admin data
    const adminEmail = cookies.get('adminEmail');
    const adminUserName = cookies.get('adminUserName');
    if (adminEmail && adminUserName) {
      setAdminData({ email: adminEmail, userName: adminUserName });
    } else {
      console.log("Admin data not found in cookies.");
    }
  }, []); // Only runs once when the component is mounted

  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
