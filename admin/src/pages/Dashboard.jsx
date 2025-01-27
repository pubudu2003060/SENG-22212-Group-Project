import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';
import cookies from "js-cookie";
import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import "../styles/background.css";
import logo from "../assets/lastfuel.png";

const { Header, Sider, Content } = Layout;

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieValue = cookies.get("adminEmail");
    console.log(cookieValue);
    if (cookieValue === undefined) {
      alert("Admin email not found");
      navigate("/login");
    }
  }, []);

  const [headerTitle, setHeaderTitle] = useState('Dashboard'); // Default title
  const userName = 'John Doe'; // Replace with user data from login

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout>
        <Sider
          width={250}
          collapsedWidth={70} // Width when collapsed
          collapsed={collapsed}
          collapsible
          trigger={null}
          className="background_sidebar"
        >
          <div className="logo-container">
            <img
              src={logo}
              alt="Logo"
              className={`logo ${collapsed ? 'logo-collapsed' : 'logo-expanded'}`}
            />
          </div>

          <div className="toggle-container">
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            />
          </div>

          <Navbar setHeaderTitle={setHeaderTitle} />
        </Sider>

        <Layout>
          <Header className="background_header">
            <Headerbar headerTitle={headerTitle} userName={userName} />
          </Header>

          <Content>
            {/* Color Block with Background Image */}
            <div className="background_cover"></div>
            <Layout className="background_layout1">
              <Content className="background_content1">fsjyjs</Content>
            </Layout>

            <Layout className="background_layout2">
              <Content className="background_content2">fsjyjs</Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Dashboard;
