import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Pagination } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

import mockData from "../../mockdata.json";
import "../styles/userManagement.css";

const { Option } = Select;

function VehicleOwners() {
    const [owners, setOwners] = useState(mockData.owners);
    const [filteredOwners, setFilteredOwners] = useState(mockData.owners);

    // const [owners, setOwners] = useState([]);
    // const [filteredOwners, setFilteredOwners] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ date: "", vehicleType: "" });

    //pagination
    const [currentPage, setCurrentPage] = useState(1); 
    const [pageSize, setPageSize] = useState(5); // Number of items per page

    // Fetch data from API
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/getusers")
            .then((response) => {
                setOwners(response.data);
                setFilteredOwners(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error("Error fetching vehicle owners:", error));
    }, []);

    // Handle search and filter
    useEffect(() => {
        let results = owners;

        // Search by NIC or Registration No
        if (searchQuery) {
            results = results.filter(
                (owner) =>
                    owner.nic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    owner.registrationNo.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by Date
        if (filters.date) {
            results = results.filter((owner) => owner.registrationDate === filters.date);
        }

        // Filter by Vehicle Type
        if (filters.vehicleType) {
            results = results.filter((owner) => owner.vehicleType === filters.vehicleType);
        }

        setFilteredOwners(results);
    }, [searchQuery, filters, owners]);

    // Handle input changes
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handlePageChange = (page, pageSize) => { 
        setCurrentPage(page); 
        setPageSize(pageSize); 
    }; 
    const paginatedOwners = filteredOwners.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <h4 className="owner-heading">Vehicle Owners</h4>

            {/* Search and filter inputs */}
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Input
                    type="text"
                    placeholder="Search by NIC or Registration No"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ marginRight: "1rem"}}
                />
                <Input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                    style={{ marginRight: "1rem", width: "20%" }}
                />
                <Select
                    name="vehicleType"
                    value={filters.vehicleType}
                    onChange={(value) => handleFilterChange({ target: { name: 'vehicleType', value } })}
                    style={{ width: 200 }}
                    placeholder="Filter by Vehicle Type"
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Vehicle Types</Option>
                    <Option value="Car">Car</Option>
                    <Option value="Motorcycle">Motorcycle</Option>
                    <Option value="Truck">Truck</Option>
                </Select>
            </div>

            {/* Table */}
            <table border="1" className="ownersTable">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Identity Number</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Registration No</th>

                </tr>
                </thead>
                <tbody>
                    {paginatedOwners.length > 0 ? ( 
                        paginatedOwners.map((owner) => (
                            <tr key={owner.userId}>
                                <td>{owner.firstName}</td>
                                <td>{owner.lastName}</td>
                                <td>{owner.idNo + " (" + owner.identityType + ")"}</td>
                                <td>{owner.contactNo}</td>
                                <td>{owner.address}</td>
                                <td>{owner.userId}</td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
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
                total={filteredOwners.length} 
                onChange={handlePageChange} 
                style={{ marginTop: "1rem", textAlign: "right" }} 
            />
        </div>
    );
}

export default VehicleOwners;
