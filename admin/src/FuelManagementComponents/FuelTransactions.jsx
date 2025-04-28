import React, { useState, useEffect } from 'react';
import { Card, DatePicker, Select, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import cookies from "js-cookie";

const { Option } = Select;

function FuelTransactions() {
  let token = cookies.get("token");
  if (!token) {
    console.error("Token not found in cookies!");
    navigate("/login");
  }
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });
  const [transactionsCount, setTransactionsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://pass-my-fule-backend.onrender.com/api/v1/admin/getbuyquotes')
      .then(response => {
        // Extract unique fuel types
        const uniqueTypes = Array.from(new Set(response.data.map(item => item.fuelType)));
        setFuelTypes(uniqueTypes);
        if (uniqueTypes.length > 0) {
          setSelectedFuelType(uniqueTypes[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching fuel types:', error);
     //   navigate("/details-not-found");
      });
  }, [navigate]);

  useEffect(() => {
    if (selectedFuelType && selectedDate) {
      axios.get(`https://pass-my-fule-backend.onrender.com/api/v1/admin/tranctionscountByFuelTypeandDate/${selectedFuelType}/${selectedDate}`)
        .then(response => {
          setTransactionsCount(response.data); // Update state with fetched data
        })
        .catch(error => {
          console.error('Error fetching transactions count:', error);
      //    navigate("/details-not-found");
        });
    }
  }, [selectedFuelType, selectedDate, navigate]);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const handleFuelTypeChange = (value) => {
    setSelectedFuelType(value);
  };

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Select
            value={selectedFuelType}
            onChange={handleFuelTypeChange}
            style={{ width: '100%' }}
          >
            {fuelTypes.map(type => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={6} />
        <Col span={8}>
          <DatePicker
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
      <Card title="Number of Transactions Processed" bordered={false}>
        {transactionsCount}
      </Card>
    </div>
  );
}

export default FuelTransactions;
