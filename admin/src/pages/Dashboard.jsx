import React, {useState, useEffect} from 'react';
import Navbar from '../components/Navbar';
import Headerbar from '../components/Headerbar';
import Footer from '../components/Footer';
import cookies from "js-cookie";
import {Button, Layout, Card, Row, Col} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import "../styles/background.css";
import logo from "../assets/lastfuel.png";
import "../styles/Dashboard.css";

const {Header, Sider, Content} = Layout;

function Dashboard() {
    const navigate = useNavigate();

    let token = cookies.get("token");
    if (!token) {
        console.error("Token not found in cookies!");
        navigate("/login");
    }
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;

    useEffect(() => {
        const cookieValue = cookies.get("adminEmail");

        if (cookieValue === undefined) {
            alert("Admin email not found");
            navigate("/login");
        }
    }, []);

    const [headerTitle, setHeaderTitle] = useState('Dashboard');
    const [collapsed, setCollapsed] = useState(false);

    // Total active stations
    const [totalActiveFuelStations, setTotalActiveFuelStations] = useState(0);

    useEffect(() => {
        axios.get('https://pass-my-fule-backend.onrender.com/api/v1/admin/getTotalActiveFuelStations')
            .then(response => {
                setTotalActiveFuelStations(Array.isArray(response.data) && response.data.length === 0 ? 0 : response.data);
            })
            .catch(error => {
                console.error('Error fetching total active fuel stations:', error);
               // navigate("/details-not-found");
            });
    }, [navigate]);

    // Total vehicles
    const [totalVehicles, setTotalVehicles] = useState(0);

    useEffect(() => {
        axios.get('https://pass-my-fule-backend.onrender.com/api/v1/admin/getTotalVehicles')
            .then(response => {
                setTotalVehicles(Array.isArray(response.data) && response.data.length === 0 ? 0 : response.data);
            })
            .catch(error => {
                console.error('Error fetching total vehicles:', error);
           //     navigate("/details-not-found");
            });
    }, [navigate]);

    // Low fuel stations
    const [totalLowFuelStations, setTotalLowFuelStations] = useState(0);

    useEffect(() => {
        axios.get('https://pass-my-fule-backend.onrender.com/api/v1/admin/findFuelStationCapacityBelow8000')
            .then(response => {
                setTotalLowFuelStations(Array.isArray(response.data) && response.data.length === 0 ? 0 : response.data);
            })
            .catch(error => {
                console.error('Error fetching total low fuel stations:', error);
             //   navigate("/details-not-found");
            });
    }, [navigate]);

    return (
        <>
            <Layout>
                <Sider
                    width={250}
                    collapsedWidth={70}
                    collapsed={collapsed}
                    collapsible
                    trigger={null}
                    className="background_sidebar"
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
                            onClick={() => setCollapsed(!collapsed)}
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        />
                    </div>

                    <Navbar setHeaderTitle={setHeaderTitle}/>
                </Sider>

                <Layout>
                    <Header className="background_header">
                        <Headerbar headerTitle={headerTitle}/>
                    </Header>

                    <Content>
                        <div className="background_cover"></div>
                        <Layout className="background_layout1">
                            <Content className="background_content1">
                                <Row gutter={[16, 16]} style={{marginTop: "80px"}}>
                                    <Col span={8}>
                                        <Card className="dashboard-card card-active-stations"
                                              title="Total Active Fuel Stations" bordered={false}>
                                            {totalActiveFuelStations}
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card className="dashboard-card card-total-vehicles"
                                              title="Total Vehicles Registered" bordered={false}>
                                            {totalVehicles}
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card className="dashboard-card card-low-fuel-stations"
                                              title="Low Fuel Stations" bordered={false}>
                                            {totalLowFuelStations}
                                        </Card>
                                    </Col>
                                </Row>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </Layout>

            <Footer/>
        </>
    );
}

export default Dashboard;
