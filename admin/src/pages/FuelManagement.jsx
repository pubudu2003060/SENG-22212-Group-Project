import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';

import {Button, Layout} from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider, Header, Content } = Layout;

function FuelManagement() {
    const [headerTitle, setHeaderTitle] = useState('Fuel Management'); // Default title
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
                        <Layout style={{padding: 0, marginTop: 40, marginLeft: 10}}>
                            <Content style={{padding: 20, background: '#fff'}}>
                                fsjyjs
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

export default FuelManagement;
