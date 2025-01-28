import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import { Button, Layout, Table, Avatar, Row, Col, Card, Statistic } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import '../styles/StationManagement.css';

const { Sider, Header, Content } = Layout;

function StationManagement() {
    const [headerTitle, setHeaderTitle] = useState('Station Management');
    const userName = 'John Doe';
    const [collapsed, setCollapsed] = useState(false);

    const columns = [
        { title: 'Station Number', dataIndex: 'stationNumber', key: 'stationNumber' },
        { title: 'Station Name', dataIndex: 'stationName', key: 'stationName' },
        { title: 'Owner', dataIndex: 'owner', key: 'owner' },
        { title: 'Location', dataIndex: 'location', key: 'location' },
        { title: 'Registered Date', dataIndex: 'registeredDate', key: 'registeredDate' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="primary" danger>
                    Disable
                </Button>
            ),
        },
    ];

    const data = [
        { key: '1', stationNumber: '001', stationName: 'Station A', owner: 'Alice Smith', location: 'Colombo', registeredDate: '2023-01-15' },
        { key: '2', stationNumber: '002', stationName: 'Station B', owner: 'John Doe', location: 'Gampaha', registeredDate: '2023-02-10' },
        { key: '3', stationNumber: '003', stationName: 'Station C', owner: 'Jane Roe', location: 'Kandy', registeredDate: '2023-03-05' },
    ];

    return (
        <Layout className="station-management-layout">
            <Sider
                width={250}
                collapsedWidth={70}
                collapsed={collapsed}
                collapsible
                trigger={null}
                className="sidebar"
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
                <Header className="headerbar">
                    <Headerbar headerTitle={headerTitle} userName={userName} />
                    <Avatar size={40} icon={<UserOutlined />} className="profile-icon" />
                </Header>

                <Content className="content">
                    <div className="statistics-container">
                        <Row gutter={16}>
                            <Col xs={24} sm={12} lg={12}>
                                <Card>
                                    <Statistic
                                        title="Active Stations"
                                        value={10}
                                        valueStyle={{ color: '#3f8600' }}
                                    />
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} lg={12}>
                                <Card>
                                    <Statistic
                                        title="Inactive Stations"
                                        value={2}
                                        valueStyle={{ color: '#cf1322' }}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <div className="table-container">
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 5 }}
                            className="station-management-table"
                        />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default StationManagement;
