import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';
import SetNewQuota from '../FuelQuotaManagementComponents/SetNewQuota';

import {Button, Layout, Row, Col} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ResetQuota from '../FuelQuotaManagementComponents/ResetQuota';
import QuotaDetails from '../FuelQuotaManagementComponents/QuotaDetails';
import "../styles/background.css";


const { Sider, Header, Content } = Layout;

function FuelQuotaManagement() {
    const [headerTitle, setHeaderTitle] = useState('Fuel Quota Management'); // Default title
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
                trigger = {null}
                className='background_sidebar'
                >
                
                <Button 
                    type="text" 
                    className="toggle"
                    onClick = {() => setCollapsed(!collapsed)}
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
                    />   
                <Navbar setHeaderTitle={setHeaderTitle} />
                </Sider>
            
                <Layout> 
                    <Header className="background_header" >
                        <Headerbar headerTitle={headerTitle} userName={userName} /> 
                    </Header>

                    <Content>
                        {/* Color Block with Background Image */}
                        <div 
                            className="background_cover"
                        ></div>

                        
                                {/* Row with two columns */}
                                <Row  style={{ marginBottom: '10px' }}>
                                    <Col span={12}>
                                        <Layout className="background_layout1" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1'}}>
                                            <Content className="background_content1">
                                                <SetNewQuota />
                                            </Content>
                                        </Layout>
                                    </Col>

                                    <Col span={12}>
                                        <Layout className="background_layout1" style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
                                            <Content className="background_content1">
                                                <ResetQuota />
                                            </Content>
                                        </Layout>
                                    </Col>
                                </Row>
                            
                        
                        <Layout className="background_layout2">
                            <Content className="background_content2">
                                <QuotaDetails />
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

export default FuelQuotaManagement;
