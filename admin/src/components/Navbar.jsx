import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'antd';
import { HomeOutlined, AreaChartOutlined, ShopOutlined, TeamOutlined, AppstoreOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import '../styles/navbar.css'; // Import custom CSS
import LogoutButton from './LogoutButton';

function Navbar({collapsed, setHeaderTitle }) {
  const location = useLocation();

  // Dynamically initialize selectedKey based on current path
  const [selectedKey, setSelectedKey] = useState(() => {
    const pathMap = {
      '/dashboard': 'dashboard',
      '/fuelManagement': 'fuelManagement',
      '/stationManagement': 'stationManagement',
      '/userManagement': 'userManagement',
      '/fuelQuotaManagement': 'fuelQuotaManagement',
      '/settings': 'settings',
    };
    return pathMap[location.pathname] || 'dashboard';
  });

  useEffect(() => {
    const pathMap = {
      '/dashboard': 'dashboard',
      '/fuelManagement': 'fuelManagement',
      '/stationManagement': 'stationManagement',
      '/userManagement': 'userManagement',
      '/fuelQuotaManagement': 'fuelQuotaManagement',
      '/settings': 'settings',
    };
    setSelectedKey(pathMap[location.pathname] || 'dashboard');
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    const titles = {
      dashboard: 'Dashboard',
      fuelManagement: 'Fuel Management',
      stationManagement: 'Station Management',
      userManagement: 'User Management',
      fuelQuotaManagement: 'Fuel Quota Management',
      settings: 'Settings',
    };
    setHeaderTitle(titles[key] || 'Dashboard');
  };

  return (
    <>
    <div className="nav-bar">
      <Menu
        mode="inline"
        className="menu-bar"
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]} // Ensure selectedKey always matches the path
      >
        <Menu.Item key="dashboard" icon={<HomeOutlined />}>
          <Link to="/dashboard"> {collapsed ? '' : 'Dashboard'} </Link>
        </Menu.Item>
        <Menu.Item key="fuelManagement" icon={<AreaChartOutlined />}>
          <Link to="/fuelManagement"> {collapsed ? '' : 'Fuel Management'} </Link>
        </Menu.Item>
        <Menu.Item key="stationManagement" icon={<ShopOutlined />}>
          <Link to="/stationManagement"> {collapsed ? '' : 'Station Management'} </Link>
        </Menu.Item>
        <Menu.Item key="userManagement" icon={<TeamOutlined />}>
          <Link to="/userManagement"> {collapsed ? '' : 'User Management'} </Link>
        </Menu.Item>
        <Menu.Item key="fuelQuotaManagement" icon={<AppstoreOutlined />}>
          <Link to="/fuelQuotaManagement"> {collapsed ? '' : 'Fuel Quota Management'} </Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/settings"> {collapsed ? '' : 'Settings'} </Link>
        </Menu.Item>

        {/* Logout Item */}
        <Menu.Item key="logout" icon={collapsed ? <LogoutOutlined /> : null }>
          {collapsed ? <LogoutOutlined/> : <><LogoutOutlined /><LogoutButton/></>}
        </Menu.Item>
      </Menu>
    </div>
  </>
  );
}

export default Navbar;
