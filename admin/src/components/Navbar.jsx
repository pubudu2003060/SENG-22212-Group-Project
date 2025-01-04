import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined, AreaChartOutlined, PayCircleOutlined } from '@ant-design/icons';

import '../styles/navbar.css'; // Import custom CSS


function Navbar({ setHeaderTitle }) {
  const handleMenuClick = ({ key, domEvent }) => {
    const titles = {
      dashboard: 'Dashboard',
      fuelManagement: 'Fuel Management',
      stationManagement: 'Station Management',
      userManagement: 'User Management',
      fuelQuotaManagement: 'Fuel Quota Management',
      setting: 'Settings',
    };

    setHeaderTitle(titles[key] || 'Dashboard');
  };

    return (
      <div className="nav-bar">
        <Menu mode="inline" className="menu-bar" onClick={handleMenuClick}>
            <Menu.Item key="dashboard" icon={<HomeOutlined />}>
              <Link to="/dashboard"> Dashboard </Link>  
            </Menu.Item>
            
            <Menu.Item key="fuelManagement" icon={<AppstoreOutlined />}>
              <Link to="/fuelManagement"> Fuel Management </Link>
            </Menu.Item>

            <Menu.Item key="stationManagement" icon={<AppstoreOutlined />}>
              <Link to="/stationManagement"> Station Management </Link>
            </Menu.Item>

            <Menu.Item key="userManagement" icon={<AreaChartOutlined />}>
              <Link to="/userManagement"> User Management </Link>
            </Menu.Item>

            <Menu.Item key="fuelQuotaManagement" icon={<PayCircleOutlined />}>
              <Link to="/fuelQuotaManagement"> Fuel Quota Management </Link>
            </Menu.Item>

            <Menu.Item key="setting" icon={<SettingOutlined />}>
              <Link to="/Setting"> Setting </Link>
            </Menu.Item>
        </Menu>
      </div>
    );
}

export default Navbar;