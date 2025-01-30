/*import React from 'react'
import React from 'react';
import { Row, Col, Typography } from 'antd';
import '../styles/FuelDistribution.css';

function TotalFuelDistributed () {
    const { Title, Text } = Typography;

  return (
    <div>
        <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col span={8}>
                <div className="dashboard-item">
                <Title level={4}>Fuel Distributed Today</Title>
                <Text>{fuelDistribution.today} Liters</Text>
                </div>
            </Col>
            <Col span={8}>
                <div className="dashboard-item">
                <Title level={4}>Fuel Distributed This Week</Title>
                <Text>{fuelDistribution.thisWeek} Liters</Text>
                </div>
            </Col>
            <Col span={8}>
                <div className="dashboard-item">
                <Title level={4}>Fuel Distributed This Month</Title>
                <Text>{fuelDistribution.thisMonth} Liters</Text>
                </div>
            </Col>
        </Row>
    </div>
  )
}

export default TotalFuelDistributed
*/

import React from 'react';
import { Row, Col, Typography } from 'antd';


const { Title, Text } = Typography;

function TotalFuelDistributed() {
  const fuelDistribution = {
    today: 45.6,
    thisWeek: 320.8,
    thisMonth: 1234.5
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ margin: ("15px 0")  }}>
        <Col span={8}>
          <div className="dashboard-item">
            <Title level={4}>Fuel Distributed Today</Title>
            <Text style={{color : "#1890ff", fontSize: "14pt", paddingTop: "18px", display: "block"}}>{fuelDistribution.today} <br/> Liters</Text>
          </div>
        </Col>
        <Col span={8}>
          <div className="dashboard-item">
            <Title level={4}>Fuel Distributed This Week</Title>
            <Text style={{color : "#1890ff", fontSize: "14pt", paddingTop: "18px", display: "block"}}>{fuelDistribution.thisWeek} <br/> Liters</Text>
          </div>
        </Col>
        <Col span={8}>
          <div className="dashboard-item">
            <Title level={4}>Fuel Distributed This Month</Title>
            <Text style={{color : "#1890ff", fontSize: "14pt", paddingTop: "18px", display: "block"}}>{fuelDistribution.thisMonth} <br/> Liters</Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TotalFuelDistributed;

