import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  AreaChartOutlined,
  ShopOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import '../styles/navbar.css';
import LogoutButton from './LogoutButton';

function Navbar({ setHeaderTitle }) {
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
          <Link to="/dashboard"> Dashboard </Link>
        </Menu.Item>
        <Menu.Item key="fuelManagement" icon={<AreaChartOutlined />}>
          <Link to="/fuelManagement"> Fuel Management </Link>
        </Menu.Item>
        <Menu.Item key="stationManagement" icon={<ShopOutlined />}>
          <Link to="/stationManagement"> Station Management </Link>
        </Menu.Item>
        <Menu.Item key="userManagement" icon={<TeamOutlined />}>
          <Link to="/userManagement"> User Management </Link>
        </Menu.Item>
        <Menu.Item key="fuelQuotaManagement" icon={<AppstoreOutlined />}>
          <Link to="/fuelQuotaManagement"> Fuel Quota Management </Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to="/settings"> Settings </Link>
        </Menu.Item>
      </Menu>
    </div>
    <div>
      <LogoutButton />
    </div>
  </>
  );
}

export default Navbar;
