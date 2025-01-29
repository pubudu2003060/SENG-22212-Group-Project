import React, { useContext } from 'react';
import '../styles/headerbar.css';
import { UserOutlined } from '@ant-design/icons';
import Context from './Context';


function Headerbar({ headerTitle }) {

   const { adminData } = useContext(Context) // Access the global state
    
  return (
    <div className="header">
      <h1 className="header-title">{headerTitle}</h1>
      <div className="user-info">
      <UserOutlined className="user-icon" />
      <span className="user-name">{adminData.userName}</span>
      </div>
    </div>

  );
}

export default Headerbar;
