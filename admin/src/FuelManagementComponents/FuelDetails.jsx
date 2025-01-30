import React, { useState, useEffect } from 'react';
import { Button, Table, Select, Input, DatePicker, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { RangePicker } = DatePicker;

function FuelDetails() {
  const [data, setData] = useState([]); // Filtered data
  const [originalData, setOriginalData] = useState([]); // Full data
  const [stations, setStations] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: [],
    station: '',
    fuelType: '',
    regNo: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [buyQuotesResponse, customerQuotaResponse] = await Promise.all([
          axios.get('http://localhost:8080/api/v1/getbuyquotes'),
          axios.get('http://localhost:8080/api/v1/getallcustomerquota'),
        ]);

        const buyQuotesData = buyQuotesResponse.data;
        const customerQuotaData = customerQuotaResponse.data;

        // Merge data and calculate `fuelAmountPumped`
        const mergedData = customerQuotaData.map(quota => {
          const buyQuote = buyQuotesData.find(
            bq => bq.vehical.vehicalNo === quota.vehical.vehicalNo
          );
          return {
            transactionId: buyQuote ? buyQuote.bqId : 'N/A',
            vehicleRegistrationNo: quota.vehical.vehicalNo,
            vehicleType: quota.vehical.vehicalType,
            fuelType: quota.vehical.fualType,
            fuelAmountPumped: quota.eligibleFuelQuota - quota.remainFuel,
            remaining: quota.remainFuel,
            station: buyQuote ? buyQuote.fuelStation.location : 'N/A',
            date: buyQuote ? buyQuote.date : 'N/A',
          };
        });

        setData(mergedData);
        setOriginalData(mergedData); // Store original data

        // Extract unique stations and fuel types for filters
        const uniqueStations = Array.from(new Set(buyQuotesData.map(item => item.fuelStation.location)));
        const uniqueFuelTypes = Array.from(new Set(buyQuotesData.map(item => item.fuelType)));

        setStations(uniqueStations);
        setVehicleTypes(uniqueFuelTypes);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate("/details-not-found");
      }
    };

    fetchData();
  }, [navigate]);

  const handleFilterChange = (field, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: value }));
  };

  const handleApplyFilters = () => {
    let filteredData = [...originalData]; // Always start filtering from full dataset

    if (filters.dateRange.length) {
      filteredData = filteredData.filter(item => {
        const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
        const startDate = filters.dateRange[0].startOf('day').toDate();
        const endDate = filters.dateRange[1].endOf('day').toDate();
        return itemDate >= startDate && itemDate <= endDate;
      });
    }

    if (filters.station) {
      filteredData = filteredData.filter(item => item.station === filters.station);
    }

    if (filters.fuelType) {
      filteredData = filteredData.filter(item => item.fuelType === filters.fuelType);
    }

    if (filters.regNo) {
      filteredData = filteredData.filter(item =>
        item.vehicleRegistrationNo.toLowerCase().includes(filters.regNo.toLowerCase())
      );
    }

    setData(filteredData);
  };

  const handleReset = () => {
    setFilters({ dateRange: [], station: '', fuelType: '', regNo: '' }); // Reset state
  };

  const columns = [
    { title: 'Transaction ID', dataIndex: 'transactionId', key: 'transactionId' },
    { title: 'Vehicle Registration No', dataIndex: 'vehicleRegistrationNo', key: 'vehicleRegistrationNo' },
    { title: 'Vehicle Type', dataIndex: 'vehicleType', key: 'vehicleType' },
    { title: 'Fuel Type', dataIndex: 'fuelType', key: 'fuelType' },
    { title: 'Fuel Amount Pumped', dataIndex: 'fuelAmountPumped', key: 'fuelAmountPumped' },
    { title: 'Remaining', dataIndex: 'remaining', key: 'remaining' },
    { title: 'Station', dataIndex: 'station', key: 'station' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div>
      <div className="filter-box">
        <Row gutter={[16, 16]} className="filter-row">
          <Col span={6}>
            <label>Date Range</label>
            <RangePicker
              className="filter-input"
              value={filters.dateRange}  // Ensure it reflects state changes
              onChange={(dates) => handleFilterChange('dateRange', dates)}
            />
          </Col>
          <Col span={6}>
            <label>Station</label>
            <Select
              placeholder="Select Station"
              className="filter-input"
              value={filters.station}  // Reflects state changes
              onChange={(value) => handleFilterChange('station', value)}
              allowClear // Enables manual clearing
            >
              {stations.map(station => (
                <Option key={station} value={station}>
                  {station}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <label>Fuel Type</label>
            <Select
              placeholder="Select Fuel Type"
              className="filter-input"
              value={filters.fuelType}  // Reflects state changes
              onChange={(value) => handleFilterChange('fuelType', value)}
              allowClear
            >
              {vehicleTypes.map(type => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <label>Search by Vehicle Reg. No</label>
            <Input
              placeholder="Enter Registration No"
              className="filter-input"
              value={filters.regNo}  // Reflects state changes
              onChange={(e) => handleFilterChange('regNo', e.target.value)}
            />
          </Col>
        </Row>
        <Row className="button-row">
          <Button type="default" className="reset-button" onClick={handleReset}>
            Reset
          </Button>
          <Button type="primary" className="apply-button" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Row>
      </div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} className="fuel-management-table" />
    </div>
  );
}

export default FuelDetails;


//need to change
