import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

function TotalFuelDistributed() {
  const navigate = useNavigate();
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [fuelDistribution, setFuelDistribution] = useState({
    today: 0.0,
    thisWeek: 0.0,
    thisMonth: 0.0,
  });

  // Fetch fuel types on mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/getbuyquotes')
      .then(response => {
        const uniqueTypes = Array.from(new Set(response.data.map(item => item.fuelType)));
        setFuelTypes(uniqueTypes);
        if (uniqueTypes.length > 0) {
          setSelectedFuelType(uniqueTypes[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching fuel types:', error);
        navigate("/details-not-found");
      });
  }, [navigate]);

  // Handle fuel type change
  const handleFuelTypeChange = (value) => {
    setSelectedFuelType(value);
  };

  // Fetch fuel data based on selected fuel type
  const handleFetchFuelData = () => {
    if (selectedFuelType) {
      axios.get(`http://localhost:8080/api/v1/getBuyQuotasDataByFuelType/${selectedFuelType}`)
        .then(response => {
          setFuelDistribution(response.data); // Update fuel distribution data
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error fetching fuel data:', error);
          navigate("/details-not-found");
        });
    }
  };

  return (
    <div>
      <Row gutter={16} align="middle" style={{ marginBottom: '20px' }}>
        <Col span={12}>
          <Select
            value={selectedFuelType}
            onChange={handleFuelTypeChange}
            style={{ width: '200px' }}
          >
            {fuelTypes.map(type => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={4}/>
        <Col span={4}>
          <Button
            onClick={handleFetchFuelData}
            type="primary"
          >
            Fetch 
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ margin: "15px 0" }}>
        <Col span={8}>
          <div className="dashboard-item">
            <Title level={4}>Fuel Distributed Today</Title>
            <Text style={{ color: "#1890ff", fontSize: "14pt", paddingTop: "18px", display: "block" }}>
              {fuelDistribution.today} <br /> Liters
            </Text>
          </div>
        </Col>
        <Col span={8}>
          <div className="dashboard-item">
            <Title level={4}>Fuel Distributed This Week</Title>
            <Text style={{ color: "#1890ff", fontSize: "14pt", paddingTop: "18px", display: "block" }}>
              {fuelDistribution.thisWeek} <br /> Liters
            </Text>
          </div>
        </Col>
        <Col span={8}>
          <div className="dashboard-item">
            <Title level={4}>Fuel Distributed This Month</Title>
            <Text style={{ color: "#1890ff", fontSize: "14pt", paddingTop: "18px", display: "block" }}>
              {fuelDistribution.thisMonth} <br /> Liters
            </Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default TotalFuelDistributed;
