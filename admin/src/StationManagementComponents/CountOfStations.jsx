import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Statistic } from 'antd';

function CountOfStations() {
    const [activeCount, setActiveCount] = useState(0);
    const [inactiveCount, setInactiveCount] = useState(0);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/getfuelstations")
            .then((response) => {
                const stations = response.data || [];
                const activeStations = stations.filter(station => station.status === "ACTIVE");
                const inactiveStations = stations.filter(station => station.status === "INACTIVE"); 

                setActiveCount(activeStations.length);
                setInactiveCount(inactiveStations.length);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="statistics-container">
            <Row gutter={16}>
                <Col xs={24} sm={12} lg={12}>
                    <Card>
                        <Statistic
                            title="Active Stations"
                            value={activeCount}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={12}>
                    <Card>
                        <Statistic
                            title="Inactive Stations"
                            value={inactiveCount}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default CountOfStations;
