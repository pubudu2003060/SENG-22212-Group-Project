import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import { Button, Layout, Card, Row, Col } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

function Dashboard() {
    const [headerTitle, setHeaderTitle] = useState('Dashboard');
    const userName = 'John Doe';
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider 
                width={250} 
                collapsedWidth={70} 
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
                <Header style={{ padding: '0 20px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Headerbar headerTitle={headerTitle} userName={userName} />
                    <Button type="text" icon={<SettingOutlined />} size="large" />
                </Header>

                <Content style={{ padding: '20px' }}>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Card title="Total Active Fuel Stations" bordered={false}>100</Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Total Vehicles Registered" bordered={false}>2000</Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Total Fuel Distribution" bordered={false}>50000 Liters</Card>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                        <Col span={8}>
                            <Card title="Low Fuel Stations" bordered={false}>5</Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Active Registered Vehicles" bordered={false}>1800</Card>
                        </Col>
                        <Col span={8}>
                            <Card title="Remaining Stock Details" bordered={false}>15000 Liters</Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Dashboard;
