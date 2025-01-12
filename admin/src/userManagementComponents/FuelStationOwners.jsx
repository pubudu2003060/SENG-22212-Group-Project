import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Input, Select, Pagination } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

import mockData from '../../mockdata.json';
import "../styles/userManagement.css";

const { Option } = Select;

function FuelStationOwners() {
    const [stationOwners, setStationOwners] = useState(mockData.stationOwners);
    const [filteredStationOwners, setFilteredStationOwners] = useState(mockData.stationOwners);

    //const [stationOwners, setStationOwners] = useState([]);
    //const [filteredStationOwners, setFilteredStationOwners] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ date: "", status: "" });
    
    //pagination
    const [currentPage, setCurrentPage] = useState(1); 
    const [pageSize, setPageSize] = useState(5); // Number of items per page

    // Fetch data from API
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/getfuelstationowners")
        .then((response) => {
            setStationOwners(response.data);
            setFilteredStationOwners(response.data);
            console.log(response.data)
        })
        .catch((error) => console.error("Error fetching station owners:", error));
    }, []);

    //Handle search and filter
    useEffect(() => {
        let results = stationOwners;

        //Search by NIC or Registration No or Location
        if(searchQuery){
            results = results.filter(
                (stationOwner) => 
                    stationOwner.nic.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    stationOwner.registrationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    stationOwner.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        //Filter by date
        if(filters.date) {
            results = results.filter((stationOwner) => stationOwner.registrationDate === filters.date);
        }

        //Filter by status (active, inactive)
        if(filters.status) {
            results = results.filter((stationOwner) => stationOwner.status === filters.status);
        }

        setFilteredStationOwners(results);
    }, [searchQuery, filters, stationOwners]);
    
    //Handle input changes
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }

    const handlePageChange = (page, pageSize) => { 
        setCurrentPage(page); 
        setPageSize(pageSize); 
    }; 
    const paginatedOwners = filteredStationOwners.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
        <h4 className="owner-heading">Station Owners</h4>

        {/* Search and filter inputs */}
        <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <Input
                type="text"
                placeholder="Search by NIC, Registration No or Location"
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
                name="status"
                value={filters.status}
                onChange={(value) => handleFilterChange({ target: { name: 'status', value } })}
                style={{ width: 200 }}
                placeholder="Filter by Status"
                suffixIcon={<FilterOutlined />}
            >
                <Option value="">Filter by Status</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
            </Select>
        </div>

        {/* Table */}
        <table border="1" className="ownersTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Phone</th>
                    <th>Address</th>

                </tr>
            </thead>
            <tbody>
                {paginatedOwners.length > 0 ? ( 
                    paginatedOwners.map((stationOwner) => (
                        <tr>
                            <td>{stationOwner.name}</td>
                            <td>{stationOwner.nicNo}</td>
                            <td>{stationOwner.contact}</td>
                            <td>{stationOwner.address}</td>

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
            total={filteredStationOwners.length} 
            onChange={handlePageChange} 
            style={{ marginTop: "1rem", textAlign: "right" }} 
        />
    </div>
  );
}

export default FuelStationOwners
