import React, { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';
import "../styles/background.css";
import logo from "../assets/lastfuel.png";

import {Button, Layout, Card, Select, Input, Table, DatePicker, Row, Col} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import axios from 'axios'
import "../styles/FuelManagement.css"; // Assuming CSS file is in the styles folder
import TotalFuelDistributed from '../FuelManagementComponents/TotalFuelDistributed';
import FuelTransactions from '../FuelManagementComponents/FuelTransactions';
import FuelTypes from '../FuelManagementComponents/FuelTypes';
import FuelDetails from '../FuelManagementComponents/FuelDetails';


const { Sider, Header, Content } = Layout;
//const { Option } = Select;
//const { RangePicker } = DatePicker;

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

                        <Layout className="background_layout1" >
                        
                            <Row gutter={[16, 16]}>
                                <Col span={10}>
                                    <Card className="dashboard-card" bordered={false}>
                                    <TotalFuelDistributed />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card className="dashboard-card" bordered={false}>
                                        <FuelTypes />
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card className="dashboard-card" bordered={false}>
                                    <FuelTransactions />
                                    </Card>
                                </Col>
                            </Row>
                            
                        </Layout>

                        <Layout className="background_layout2">
                            <Content className="background_content2">
                                <FuelDetails />
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
