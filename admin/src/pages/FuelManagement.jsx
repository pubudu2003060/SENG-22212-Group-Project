import React, { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';
import "../styles/background.css";
import logo from "../assets/lastfuel.png";

import {Button, Layout, Select, Input, Table, DatePicker, Row, Col} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import "../styles/FuelManagement.css"; // Assuming CSS file is in the styles folder

const { Sider, Header, Content } = Layout;
const { Option } = Select;
const { RangePicker } = DatePicker;

function FuelManagement() {

    const navigate = useNavigate();

    useEffect(() => {
        const cookieValue = cookies.get("adminEmail");
        console.log(cookieValue)
        if (cookieValue == undefined) {
            alert("Admin email not found")
            navigate("/login");
        }
    }, []);
    
    const [headerTitle, setHeaderTitle] = useState('Fuel Management'); // Default title
    //const userName = 'John Doe'; // Replace with user data from login

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
        <>
           <Layout>
                <Sider 
                width={250} 
                collapsedWidth={70} // Width when collapsed
                collapsed={collapsed} 
                collapsible 
                trigger = {null}
                className='background_sidebar'
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
                    onClick = {() => setCollapsed(!collapsed)}
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
                    />
                </div>
                
                <Navbar setHeaderTitle={setHeaderTitle} />
                </Sider>
            
                <Layout> 
                    <Header className="background_header">
                        <Headerbar headerTitle={headerTitle} /> 
                    </Header>

                    <Content>
                        {/* Color Block with Background Image */}
                        <div 
                        className="background_cover"
                        ></div>
                        <Layout className="background_layout1">
                            <Content className="background_content1">
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

                    </Content>
                </Layout>
            </Layout>

            {/* Footer */}
            <Footer />
        </>
    );
    }

export default FuelManagement;
