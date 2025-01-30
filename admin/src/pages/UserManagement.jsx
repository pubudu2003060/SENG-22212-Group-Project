import React, { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';
import VehicleOwners from '../userManagementComponents/VehicleOwners'

import {Button, Layout} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import FuelStationOwners from '../userManagementComponents/FuelStationOwners';
import "../styles/background.css";
import cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import logo from "../assets/lastfuel.png";



const { Sider, Header, Content } = Layout;

function UserManagement() {

    const navigate = useNavigate();

    useEffect(() => {
        const cookieValue = cookies.get("adminEmail");
        console.log(cookieValue)
        if (cookieValue == undefined) {
            alert("Admin email not found")
            navigate("/login");
        }
    }, []);

    const [headerTitle, setHeaderTitle] = useState('User Management'); // Default title
    //const userName = 'John Doe'; // Replace with user data from login

    const [collapsed, setCollapsed] = useState(false);
    const [activeComponent, setActiveComponent] = useState('VehicleOwners');

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
                                <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '0.5rem' }}> 
                                    <Button 
                                        type={activeComponent === 'VehicleOwners' ? 'primary' : 'default'} 
                                        onClick={() => setActiveComponent('VehicleOwners')} 
                                        style={{ marginRight: '1rem' }}
                                        > Vehicle Owners 
                                    </Button> 
                                    <Button 
                                        type={activeComponent === 'FuelStationOwners' ? 'primary' : 'default'} 
                                        onClick={() => setActiveComponent('FuelStationOwners')} 
                                        > Station Owners 
                                    </Button> 
                                </div>
                                {activeComponent === 'VehicleOwners' && <VehicleOwners />} 
                                {activeComponent === 'FuelStationOwners' && <FuelStationOwners />}
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

export default UserManagement;
