import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import { Button, Layout, Select, Input, Table, DatePicker, Row, Col } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import "../styles/FuelManagement.css"; // Assuming CSS file is in the styles folder

const { Sider, Header, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

function FuelManagement() {
    const [headerTitle, setHeaderTitle] = useState('Fuel Management');
    const userName = 'John Doe';
    const [collapsed, setCollapsed] = useState(false);

    const columns = [
        { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
        { title: 'Vehicle Registration No', dataIndex: 'vehicleRegNo', key: 'vehicleRegNo' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Fuel Amount Pumped', dataIndex: 'fuelAmount', key: 'fuelAmount' },
        { title: 'Remaining', dataIndex: 'remaining', key: 'remaining' },
        { title: 'Station', dataIndex: 'station', key: 'station' },
        { title: 'Date', dataIndex: 'date', key: 'date' }
    ];

    const data = [
        {
            key: '1',
            transactionId: 'TXN12345',
            vehicleRegNo: 'ABC-1234',
            type: 'Car',
            fuelAmount: '20L',
            remaining: '30L',
            station: 'Station A',
            date: '2024-01-20'
        },
        {
            key: '2',
            transactionId: 'TXN67890',
            vehicleRegNo: 'XYZ-5678',
            type: 'Truck',
            fuelAmount: '50L',
            remaining: '20L',
            station: 'Station B',
            date: '2024-01-21'
        }
    ];

    return (
        <Layout className="fuel-management-layout">
            <Sider 
                width={250} 
                collapsedWidth={70} 
                collapsed={collapsed} 
                collapsible 
                trigger={null} 
                className='sidebar'
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
                    <div className="filter-box">
                        <Row gutter={[16, 16]} className="filter-row">
                            <Col span={6}>
                                <label>Date Range</label>
                                <RangePicker className="filter-input" />
                            </Col>
                            <Col span={6}>
                                <label>Station</label>
                                <Select placeholder="Select Station" className="filter-input">
                                    <Option value="stationA">Station A</Option>
                                    <Option value="stationB">Station B</Option>
                                </Select>
                            </Col>
                            <Col span={6}>
                                <label>Vehicle Type</label>
                                <Select placeholder="Select Vehicle Type" className="filter-input">
                                    <Option value="car">Car</Option>
                                    <Option value="truck">Truck</Option>
                                </Select>
                            </Col>
                            <Col span={6}>
                                <label>Search by Vehicle Reg. No</label>
                                <Input placeholder="Enter Registration No" className="filter-input" />
                            </Col>
                        </Row>
                        <Row className="button-row">
                            <Button type="default" className="reset-button">Reset</Button>
                            <Button type="primary" className="apply-button">Apply</Button>
                        </Row>
                    </div>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} className="fuel-management-table" />
                </Content>
            </Layout>
        </Layout>
    );
}

export default FuelManagement;
