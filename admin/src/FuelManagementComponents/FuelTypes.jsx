import React, { useState, useEffect } from 'react';
import { Card, List, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookies from "js-cookie";

const { Title } = Typography;

function FuelTypes() {
    let token = cookies.get("token");
    if (!token) {
        console.error("Token not found in cookies!");
        navigate("/login");
    }
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;

  const [fuelTypes, setFuelTypes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('https://pass-my-fule-backend.onrender.com/api/v1/admin/getbuyquotes')
      .then(response => {
        // Extract unique fuel types
        const uniqueTypes = Array.from(new Set(response.data.map(item => item.fuelType)));
        setFuelTypes(uniqueTypes);
      })
      .catch(error => {
        console.error('Error fetching fuel types:', error);
    //    navigate("/details-not-found");
      });
  }, [navigate]);

  return (
    <Card
      title={<Title level={3} style={{ marginBottom: '8px' }}>Fuel Types</Title>}
      bordered={false}
      style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <List
        itemLayout="horizontal"
        dataSource={fuelTypes}
        renderItem={type => (
          <List.Item >
            <List.Item.Meta
              title={<Title level={4} style={{ margin: 0, color: 'chocolate' }}>{type}</Title>}
            />
          </List.Item>
        )}
        style={{ marginTop: '-8px' }} // Reduces gap between items
      />
    </Card>
  );
}

export default FuelTypes;
