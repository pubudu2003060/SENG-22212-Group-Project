import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Pagination } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import "../styles/userManagement.css";
import cookies from "js-cookie";

const { Option } = Select;

function VehicleOwners() {
    let token = cookies.get("token");
    if (!token) {
        console.error("Token not found in cookies!");
        navigate("/login");
    }
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;

    const [owners, setOwners] = useState([]);
    const [filteredOwners, setFilteredOwners] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ identityType: "" });
    const [identityType, setIdentityType] = useState([]);
    const navigate = useNavigate();

    //pagination
    const [currentPage, setCurrentPage] = useState(1); 
    const [pageSize, setPageSize] = useState(5); // Number of items per page

    // Fetch data from API 
    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get("http://localhost:8080/api/v1/admin/getusers");
            console.log(response.data); 
            setOwners(response.data || []); // Use fallback if owners is undefined
            setFilteredOwners(response.data || []);
      
            // Extract unique identity types
            const uniqueTypes = Array.from(new Set(response.data.map((owner) => owner.identityType)));
            setIdentityType(uniqueTypes);
          } catch (error) {
            console.error("Error fetching data:", error);
           // navigate("/details-not-found");
          }
        };
        fetchUsers();
      }, [navigate]);
      
    
    // Handle search and filter
    useEffect(() => {
        let results = owners;

        // Search by NIC or Registration No
        if (searchQuery) {
            results = results.filter(
                (owner) =>
                    owner.idNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    owner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    owner.userId.toString().includes(searchQuery)
            );
        }

        // Filter by Identity Type
        if (filters.identityType) {
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
                    placeholder="Search by Id, Name or Registration No"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ marginRight: "1rem"}}
                />

                <Select
                    name="identityType"
                    value={filters.identityType}
                    onChange={(value) => handleFilterChange({ target: { name: 'identityType', value } })}
                    style={{ width: 200 }}
                    placeholder="Filter by Identity Type"
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Identity Types</Option>
                    {identityType.map((type) => (
                        <Option key={type} value={type}>
                            {type}
                        </Option>
                    ))}
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
                total={filteredOwners.length} 
                onChange={handlePageChange} 
                style={{ marginTop: "1rem", textAlign: "right" }} 
            />
        </div>
    );
}

export default VehicleOwners;
