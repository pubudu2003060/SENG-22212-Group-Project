import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import { Button, Layout, Select, Input, Table } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Sider, Header, Content } = Layout;
const { Option } = Select;

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
        <Layout>
            <Sider 
                width={250} 
                collapsedWidth={70} 
                collapsed={collapsed} 
                collapsible 
                trigger={null} 
                className='sidebar' 
                style={{ padding: 0, background: '#fff' }}
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
                <Header style={{ padding: 0, background: '#fff' }}>
                    <Headerbar headerTitle={headerTitle} userName={userName} />
                </Header>

                <Content style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
                        <Select placeholder="Select Station" style={{ width: 200 }}>
                            <Option value="stationA">Station A</Option>
                            <Option value="stationB">Station B</Option>
                        </Select>
                        <Select placeholder="Select Vehicle Type" style={{ width: 200 }}>
                            <Option value="car">Car</Option>
                            <Option value="truck">Truck</Option>
                        </Select>
                        <Input placeholder="Search by Vehicle Registration No" style={{ width: 300 }} />
                    </div>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
                </Content>
            </Layout>
        </Layout>
    );
}

export default FuelManagement;





// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Headerbar from '../components/Headerbar';

// import {Button, Layout} from 'antd';
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// const { Sider, Header, Content } = Layout;

// function FuelManagement() {
//     const [headerTitle, setHeaderTitle] = useState('Fuel Management'); // Default title
//     const userName = 'John Doe'; // Replace with user data from login

//     const [collapsed, setCollapsed] = useState(false);

//     return (
//         <>
//            <Layout>
//                 <Sider 
//                 width={250} 
//                 collapsedWidth={70} // Width when collapsed
//                 collapsed={collapsed} 
//                 collapsible 
//                 trigger = {null}
//                 className='sidebar'
//                 style={{padding: 0, background: '#fff'}}
//                 >
                
//                 <Button 
//                     type="text" 
//                     className="toggle"
//                     onClick = {() => setCollapsed(!collapsed)}
//                     icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} 
//                     />   
//                 <Navbar setHeaderTitle={setHeaderTitle} />
//                 </Sider>
            
//                 <Layout> 
//                     <Header style={{padding: 0, background: '#fff'}}>
//                         <Headerbar headerTitle={headerTitle} userName={userName} /> 
//                     </Header>

//                     <Content>
//                         <Layout style={{padding: 0, marginTop: 40, marginLeft: 10}}>
//                             <Content style={{padding: 20, background: '#fff'}}>
//                                 fsjyjs
//                             </Content>
//                         </Layout>

//                         <Layout style={{padding: 0, marginTop: 10, marginLeft: 10}}>
//                             <Content style={{padding: 20, background: '#fff'}}>
//                                 fsjyj
//                             </Content>
//                         </Layout>

//                     </Content>
//                 </Layout>
//             </Layout>
//         </>
//     );
//     }

// export default FuelManagement;

