import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Pagination, Button } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import "../styles/fuelQuotaManagement.css";

const { Option } = Select;

function QuotaDetails() {
    const [quota, setQuota] = useState([]);
    const [filteredQuota, setFilteredQuota] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ eligibleFuelQuota: "", vehicleType: "" });
    const [uniqueVehicleTypes, setUniqueVehicleTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/getallcustomerquota");
                const data = response.data || [];
                setQuota(data);
                setFilteredQuota(data);
    
                // Extract unique vehicle types
                const uniqueTypes = Array.from(
                    new Set(data.map((item) => item.vehical.vehicalType))
                );
                setUniqueVehicleTypes(uniqueTypes);
            } catch (error) {
                console.error("Error fetching data:", error);
                navigate("/details-not-found");
            }
        };
    
        fetchData();
    }, [navigate]);
    

    useEffect(() => {
        let results = quota;

        // Apply search filters
        if (searchQuery) {
            results = results.filter(
                (q) =>
                    q.user.idNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.vehical.vehicalNo.toString().includes(searchQuery)
            );
        }

        // Apply eligibleFuelQuota filter
        if (filters.eligibleFuelQuota) {
            results = results.filter((q) => q.eligibleFuelQuota === Number(filters.eligibleFuelQuota));
        }

        // Apply vehicleType filter
        if (filters.vehicleType) {
            results = results.filter((q) => q.vehical.vehicalType === filters.vehicleType);
        }

        setFilteredQuota(results);
        setCurrentPage(1); // Reset pagination when filters change
    }, [searchQuery, filters, quota]);

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
        <div className='quota_container'>
            <h4 className="quota-heading">Fuel Quota Details for Each Vehicle</h4>

            {/* Search and filter inputs */}
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Input
                    type="text"
                    placeholder="Search by NIC or Vehicle Registration No"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ marginRight: "1rem" }}
                />
                <Select
                    value={filters.eligibleFuelQuota}
                    onChange={(value) => handleFilterChange("eligibleFuelQuota", value)}
                    placeholder="Filter by Eligible Fuel Quota"
                    style={{ marginRight: "1rem", width: "20%" }}
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Eligible Fuel Quotas</Option>
                    {[10, 20, 30, 40].map((quota) => (
                        <Option key={quota} value={quota}>
                            {quota}L
                        </Option>
                    ))}
                </Select>
                <Select
                    value={filters.vehicleType}
                    onChange={(value) => handleFilterChange("vehicleType", value)}
                    placeholder="Filter by Vehicle Type"
                    style={{ width: 200 }}
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Vehicle Types</Option>
                    {uniqueVehicleTypes.map((type) => (
                        <Option key={type} value={type}>
                            {type}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Table */}
            <table  border="1" className="quota-details_table">
                <thead>
                    <tr>
                        <th>Vehicle Registration No</th>
                        <th>Vehicle Type</th>
                        <th>Fuel Type</th>
                        <th>Owner's Name</th>
                        <th>NIC</th>
                        <th>Eligible Days</th>
                        <th>Eligible Fuel Quota (L)</th>
                        <th>Remaining Fuel Quota (L)</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedQuota.length > 0 ? (
                        paginatedQuota.map((q) => (
                            <tr key={q.customerFuelQuotaId}>
                                <td>{q.vehical.vehicalNo}</td>
                                <td>{q.vehical.vehicalType}</td>
                                <td>{q.vehical.fualType}</td>
                                <td>{`${q.user.firstName} ${q.user.lastName}`}</td>
                                <td>{q.user.idNo}</td>
                                <td>{q.eligibleDays}</td>
                                <td>{q.eligibleFuelQuota}L</td>
                                <td>{q.remainFuel}L</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" style={{ textAlign: "center" }}>
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
