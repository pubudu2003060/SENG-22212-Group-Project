import React, { useState } from 'react';
import { Layout, Button, Select, Input, Table, Row, Col, Card, Statistic } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import '../styles/FuelQuotaManagement.css';

const { Sider, Header, Content } = Layout;
const { Option } = Select;

function FuelQuotaManagement() {
    const [headerTitle, setHeaderTitle] = useState('Fuel Quota Management');
    const userName = 'John Doe'; // Replace with user data from login
    const [collapsed, setCollapsed] = useState(false);

    // Table data
    const columns = [
        { title: 'Vehicle Type', dataIndex: 'vehicleType', key: 'vehicleType' },
        { title: 'Owner', dataIndex: 'owner', key: 'owner' },
        { title: 'Fuel Quota (L)', dataIndex: 'fuelQuota', key: 'fuelQuota' },
        { title: 'Last Update', dataIndex: 'lastUpdate', key: 'lastUpdate' },
    ];

    const data = [
        { key: '1', vehicleType: 'Car', owner: 'Alice Smith', fuelQuota: '3', lastUpdate: '2023-01-15' },
        { key: '2', vehicleType: 'Truck', owner: 'John Doe', fuelQuota: '10', lastUpdate: '2023-02-10' },
        { key: '3', vehicleType: 'Bus', owner: 'Jane Roe', fuelQuota: '7', lastUpdate: '2023-03-05' },
    ];

    return (
        <Layout>
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
                </Header>

                <Content className="content">
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Card title="Set New Quota" className="quota-card">
                                <div>
                                    <Select defaultValue="Car" style={{ width: '100%', marginBottom: '10px' }}>
                                        <Option value="Car">Car</Option>
                                        <Option value="Truck">Truck</Option>
                                        <Option value="Bus">Bus</Option>
                                    </Select>
                                </div>
                                <div>Current fuel quota for car: 3L</div>
                                <div>Set new fuel quota for car:
                                    <Input defaultValue="5" style={{ width: '60px', margin: '10px 0' }} /> L
                                </div>
                                <Button type="danger" style={{ marginRight: '10px' }}>Reset</Button>
                                <Button type="primary">Apply</Button>
                            </Card>
                        </Col>

                        <Col xs={24} md={12}>
                            <Card title="Reset Quota" className="quota-card">
                                <Button type="danger" style={{ width: '100%' }}>Reset All Quotas</Button>
                            </Card>
                        </Col>
                    </Row>

                    <Card title="Fuel Quota Table" className="table-card">
                        <div className="table-actions">
                            <Input.Search
                                placeholder="Search by Owner"
                                style={{ width: '200px', marginRight: '10px' }}
                            />
                            <Select defaultValue="All" style={{ width: '200px' }}>
                                <Option value="All">Filter by Vehicle Type</Option>
                                <Option value="Car">Car</Option>
                                <Option value="Truck">Truck</Option>
                                <Option value="Bus">Bus</Option>
                            </Select>
                        </div>

                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={{ pageSize: 5 }}
                            className="station-management-table"
                            style={{ marginTop: '20px' }}
                        />
                    </Card>

                    <div className="footer-info">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Statistic title="Total Fuel Quota (L)" value={20} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Remaining Quota (L)" value={10} />
                            </Col>
                            <Col span={8}>
                                <Statistic title="Last Update" value="2023-03-05" />
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default FuelQuotaManagement;
