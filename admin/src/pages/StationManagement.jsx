import React, { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';
import { Button, Layout, Table, Avatar, Row, Col, Card, Statistic } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import "../styles/background.css";
import cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import logo from "../assets/lastfuel.png";

import '../styles/StationManagement.css';

const { Sider, Header, Content } = Layout;

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
    
    const [headerTitle, setHeaderTitle] = useState('Station Management'); // Default title
    //const userName = 'John Doe'; // Replace with user data from login

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
                        <Layout style={{padding: 0, marginTop: 40, marginLeft: 10}}>
                            <Content style={{padding: 20, background: '#fff'}}>
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
                            </Content>
                        </Layout>

                        <Layout style={{padding: 0, marginTop: 10, marginLeft: 10}}>
                            <Content style={{padding: 20, background: '#fff'}}>
                                fsjyjs
                            </Content>
                        </Layout>

                    </Content>
                </Layout>
            </Layout>
        </>
    );
}

export default StationManagement;
