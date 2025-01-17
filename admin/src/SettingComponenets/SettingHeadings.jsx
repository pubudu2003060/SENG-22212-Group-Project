import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, SecurityScanOutlined } from '@ant-design/icons';

import '../styles/navbar.css'; // Import custom CSS

function SettingHeadings({ setSelectedSetting }) {
  const handleMenuClick = ({ key }) => {
    setSelectedSetting(key); // Update the selected setting in the parent component
  };

  return (
    <div>
      <Menu mode="inline" className="menu-bar" onClick={handleMenuClick}>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        <Menu.Item key="changePassword" icon={<SecurityScanOutlined />}>
          Change Password
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default SettingHeadings;
