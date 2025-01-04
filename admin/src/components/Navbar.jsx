import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';
import { AppstoreOutlined, HomeOutlined, SettingOutlined, AreaChartOutlined, PayCircleOutlined, BarsOutlined } from '@ant-design/icons';


function Navbar() {

    return (
        <Menu mode="inline" className="menu-bar">
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
    );
}

export default Navbar;