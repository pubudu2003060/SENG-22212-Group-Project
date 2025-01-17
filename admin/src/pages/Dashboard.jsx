import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';

import { Button, Layout } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function Dashboard() {
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
          className='sidebar'
          style={{ padding: 0, background: '#fff' }}
        >
          <Button
            type="text"
            className="toggle"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <Navbar setHeaderTitle={setHeaderTitle} />
        </Sider>

        <Layout>
          <Header style={{ padding: 0, background: '#fff', position: 'relative', zIndex: 10 }}>
            <Headerbar headerTitle={headerTitle} userName={userName} />
          </Header>

          <Content>
            {/* Color Block with Background Image */}
            <div 
              style={{ 
                backgroundImage: "url('https://media.istockphoto.com/id/1655140679/vector/abstract-black-green-and-teal-geometric-rectangle-vector-background.jpg?s=612x612&w=0&k=20&c=fwUKF1fIxBJEWBcnw1iso2fvGZs1865EtI8NpbIAYy0=')", 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '30%', 
                width: 'calc(100% - 20px)', 
                position: 'absolute', 
                top: 0, 
                zIndex: 1 
              }} 
            ></div>
            <Layout style={{ padding: 0, marginTop: 100, marginLeft: 20, marginRight: 20, position: 'relative', zIndex: 2 }}>
              <Content style={{ padding: 20, background: '#fff' }}>
                fsjyjs
              </Content>
            </Layout>

            <Layout style={{ padding: 0, marginTop: 10, marginLeft: 10 }}>
              <Content style={{ padding: 20, background: '#fff' }}>
                fsjyjs
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

export default Dashboard;
