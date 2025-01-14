import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Pagination } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import "../styles/fuelQuotaManagement.css";
import mockData from "../../mockdata.json";

const { Option } = Select;

function QuotaDetails() {
    const [quota, setQuota] = useState(mockData.quotas);
    const [filteredQuota, setFilteredQuota] = useState(mockData.quotas);
    const [vehicleTypes, setVehicleTypes] = useState(mockData.vehicleType);

    //const [quota, setQuota] = useState([]);
    //const [filteredQuota, setFilteredQuota] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ date: "", vehicleType: "" });
    //const [vehicleTypes, setVehicleTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    /*// Fetch quota, vehicletype data
    useEffect(() => { 
      axios.get("http://localhost:8080/api/v1/getQuotaAndVehicleTypes") 
        .then((response) => { 
            const { quotas, vehicleType } = response.data; 
            setQuota(quotas); 
            setFilteredQuota(quotas); 
            setVehicleTypes(vehicleType); }) 
        .catch((error) => console.error("Error fetching data:", error)); 
    }, []);*/
    
    // Filter and search logic
    useEffect(() => {
        let results = quota;

        if (searchQuery) {
            results = results.filter(
                (q) =>
                    q.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.registrationNo.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filters.date) {
            results = results.filter((q) => q.lastUpdateDate === filters.date);
        }

        if (filters.vehicleType) {
            results = results.filter((q) => q.vehicleType === filters.vehicleType);
        }

        setFilteredQuota(results);
    }, [searchQuery, filters, quota]);

    // Handle input changes
    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const paginatedQuota = filteredQuota.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <h4 className="quota-heading">Fuel Quota Details for Each Vehicle</h4>

            {/* Search and filter inputs */}
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Input
                    type="text"
                    placeholder="Search by Owner Name or Registration No"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ marginRight: "1rem" }}
                />
                <Input
                    type="date"
                    value={filters.date}
                    onChange={(e) => handleFilterChange("date", e.target.value)}
                    style={{ marginRight: "1rem", width: "20%" }}
                />
                <Select
                    value={filters.vehicleType}
                    onChange={(value) => handleFilterChange("vehicleType", value)}
                    style={{ width: 200 }}
                    placeholder="Filter by Vehicle Type"
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Vehicle Types</Option>
                      {vehicleTypes.map((type) => (
                        <Option key={type.id} value={type.name}>
                            {type.name}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Table */}
            <table border="1" className="ownersTable">
                <thead>
                    <tr>
                        <th>Vehicle Registration No</th>
                        <th>Owner's Name</th>
                        <th>Vehicle Type</th>
                        <th>Current Fuel Quota (L)</th>
                        <th>Used Fuel Quota (L)</th>
                        <th>Last Update Date</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedQuota.length > 0 ? (
                        paginatedQuota.map((q) => (
                            <tr key={q.registrationNo}>
                                <td>{q.registrationNo}</td>
                                <td>{q.ownerName}</td>
                                <td>{q.vehicleType}</td>
                                <td>{q.currentFuelQuota}</td>
                                <td
                                  style={{
                                    color: q.usedFuelQuota === q.currentFuelQuota ? "red" : "inherit",
                                  }}
                                >{q.usedFuelQuota}</td>
                                <td>{q.lastUpdateDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                No results found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredQuota.length}
                onChange={handlePageChange}
                style={{ marginTop: "1rem", textAlign: "right" }}
            />
        </div>
    );
}

export default QuotaDetails;
