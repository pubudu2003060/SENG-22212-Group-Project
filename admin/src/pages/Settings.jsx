import React, {useEffect, useState} from 'react';
import { Layout, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Profile from '../SettingComponenets/Profile';
import ChangePassword from '../SettingComponenets/ChangePassword';
import SettingHeadings from '../SettingComponenets/SettingHeadings';
import Footer from '../components/Footer';

import '../styles/settings.css';
import cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const { Header, Sider, Content } = Layout;

function Settings() {

  const navigate = useNavigate();

  useEffect(() => {
    const cookieValue = cookies.get("adminEmail");
    console.log(cookieValue)
    if (cookieValue == undefined) {
      alert("Admin email not found")
      navigate("/login");
    }
  }, []);


  const [headerTitle, setHeaderTitle] = useState('Settings'); // Default title
  const userName = 'John Doe'; // Replace with user data from login

  const [collapsed, setCollapsed] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState('profile'); // Manage selected setting

  return (
    <>
    <Layout style={{ height: '100vh'}}>
      {/* Main Sidebar */}
      <Sider
        width={250}
        collapsedWidth={70}
        collapsed={collapsed}
        collapsible
        trigger={null}
        className="sidebar"
        style={{padding: 0, background: '#fff' }}
      >
        <Button
          type="text"
          className="toggle"
          onClick={() => setCollapsed(!collapsed)}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
        <Navbar setHeaderTitle={setHeaderTitle} />
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Headerbar headerTitle={headerTitle} userName={userName} />
        </Header>

        <Content style={{ overflow: 'hidden', margin: '1rem'  }}>
          <Layout style={{padding: 0, marginTop: 30, marginLeft: 10, height: '100%' }}>
            <Content style={{padding: 20, background: '#fff', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', flex: 1 }}>

              {/* Profile Section */}
              <div className="profile-container">
                <div className="profileIcon">
                  <UserOutlined />
                </div>
                <div className="profile">
                  <h3>{userName}</h3>
                  <h6>Admin Account</h6>
                </div>
              </div>

              {/* Settings Section */}
              <div style={{ display: 'flex', gap: '20px' }}>
                {/* Inner Sider for headings */}
                <Sider
                  width={250}
                  className="inner-sidebar"
                  style={{
                    backgroundColor: '#fff',
                    bborderLeft: 'none',
                    boxShadow: 'none',
                    overflow: 'hidden' // Ensure no scrollbar appears
                  }}
                >
                  <SettingHeadings setSelectedSetting={setSelectedSetting} />
                </Sider>

                {/* Content Area */}
                <Content style={{ padding: 20, background: '#fff', flex: 1 }}>
                  {selectedSetting === 'profile' && <Profile />}
                  {selectedSetting === 'changePassword' && <ChangePassword />}
                </Content>
              </div>
            </Content>
          </Layout>
        </Content>
        
      </Layout>
    </Layout>
    
    {/* Footer */}
    <Footer />
    </>
  );
}

export default Settings;
