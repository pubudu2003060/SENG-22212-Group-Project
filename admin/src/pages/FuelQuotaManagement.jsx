import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import SetNewQuota from '../FuelQuotaManagementComponents/SetNewQuota';
//import ResetQuota from '../FuelQuotaManagementComponents/ResetQuota';
//import QuotaDetails from '../FuelQuotaManagementComponents/QuotaDetails';

import {Button, Layout, Row, Col} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ResetQuota from '../FuelQuotaManagementComponents/ResetQuota';
import QuotaDetails from '../FuelQuotaManagementComponents/QuotaDetails';

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
                className='sidebar'
                style={{padding: 0, background: '#fff'}}
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
                    <Header style={{padding: 0, background: '#fff'}}>
                        <Headerbar headerTitle={headerTitle} userName={userName} /> 
                    </Header>

                    <Content>
                        {/* Row with two columns */}
                        <Row  style={{ marginBottom: '10px' }}>
                            <Col span={12}>
                                <Layout style={{padding: 0, marginTop: 40, marginLeft: 10, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'}}>
                                    <Content style={{padding: 20, background: '#fff'}}>
                                        <SetNewQuota />
                                    </Content>
                                </Layout>
                            </Col>

                            <Col span={12}>
                                <Layout style={{padding: 0, marginTop: 40, marginLeft: 10, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'}}>
                                    <Content style={{padding: 20, background: '#fff'}}>
                                        <ResetQuota />
                                    </Content>
                                </Layout>
                            </Col>
                        </Row>
                        
                        <Layout style={{padding: 0, marginTop: 10, marginLeft: 10, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'}}>
                            <Content style={{padding: 20, background: '#fff'}}>
                                <QuotaDetails />
                            </Content>
                        </Layout>

                    </Content>
                </Layout>
            </Layout>
        </>
    );
    }

export default FuelQuotaManagement;
