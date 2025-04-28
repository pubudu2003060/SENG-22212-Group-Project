import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Pagination } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import UpdateStationStatus from './UpdateStationStatus';
import "../styles/StationManagement.css";
import StationDetails from './StationsDetails';
import { useNavigate } from 'react-router-dom';
import cookies from "js-cookie";

const { Option } = Select;

function InactiveFuelStations() {
    let token = cookies.get("token");
    if (!token) {
        console.error("Token not found in cookies!");
        navigate("/login");
    }
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ location: "", stationType: "", fuelType: "" });
    const [locations, setLocations] = useState([]);
    const [stationTypes, setStationTypes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const navigate = useNavigate();

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Number of items per page

    // Fetch data from API
    useEffect(() => {
        const fetchStations = async () => {
          try {
            const response = await axios.get("https://pass-my-fule-backend.onrender.com/api/v1/admin/filterByStatus?status=INACTIVE");
            console.log(response.data);
            setStations(response.data || []); // Use fallback if stations is undefined
            setFilteredStations(response.data || []);
      
            // Extract unique filters
            const uniqueLocations = Array.from(new Set(response.data.map((station) => station.location)));
            const uniqueStationTypes = Array.from(new Set(response.data.map((station) => station.stationType)));
            const uniqueFuelTypes = Array.from(new Set(response.data.map((station) => station.fuelType)));
            setLocations(uniqueLocations);
            setStationTypes(uniqueStationTypes);
            setFuelTypes(uniqueFuelTypes);
          } catch (error) {
            console.error("Error fetching data:", error);
          //  navigate("/details-not-found");
          }
        };
        fetchStations();
      }, [navigate]);
      

    // Handle search and filter
    useEffect(() => {
        let results = stations;

        // Search by station registered ID or owner's name
        if (searchQuery) {
            results = results.filter(
                (station) =>
                    station.registeredId.toString().includes(searchQuery) ||
                    station.fuelStationOwner.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by Location
        if (filters.location) {
            results = results.filter((station) => station.location === filters.location);
        }

        // Filter by Station Type
        if (filters.stationType) {
            results = results.filter((station) => station.stationType === filters.stationType);
        }

        // Filter by Fuel Type
        if (filters.fuelType) {
            results = results.filter((station) => station.fuelType === filters.fuelType);
        }

        setFilteredStations(results);
    }, [searchQuery, filters, stations]);

    // Handle input changes
    const handleSearchChange = (e) => setSearchQuery(e.target.value);
    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const paginatedStations = filteredStations.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <h4 className="station-heading">Fuel Stations</h4>

            {/* Search and filter inputs */}
            <div style={{ marginBottom: "1.5rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Input
                    type="text"
                    placeholder="Search by Station Registered ID or Owner's Name"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    prefix={<SearchOutlined />}
                    style={{ marginRight: "1rem" }}
                />

                <Select
                    name="location"
                    value={filters.location}
                    onChange={(value) => handleFilterChange('location', value)}
                    style={{ width: 200, marginRight: "1rem" }}
                    placeholder="Filter by Location"
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Locations</Option>
                    {locations.map((location) => (
                        <Option key={location} value={location}>
                            {location}
                        </Option>
                    ))}
                </Select>

                <Select
                    name="stationType"
                    value={filters.stationType}
                    onChange={(value) => handleFilterChange('stationType', value)}
                    style={{ width: 200, marginRight: "1rem" }}
                    placeholder="Filter by Station Type"
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Station Types</Option>
                    {stationTypes.map((type) => (
                        <Option key={type} value={type}>
                            {type}
                        </Option>
                    ))}
                </Select>

                <Select
                    name="fuelType"
                    value={filters.fuelType}
                    onChange={(value) => handleFilterChange('fuelType', value)}
                    style={{ width: 200 }}
                    placeholder="Filter by Fuel Type"
                    suffixIcon={<FilterOutlined />}
                >
                    <Option value="">All Fuel Types</Option>
                    {fuelTypes.map((type) => (
                        <Option key={type} value={type}>
                            {type}
                        </Option>
                    ))}
                </Select>
            </div>

            {/* Table */}
            <div className="table-wrapper">
            <table border="1" className="stationsTable">
                <thead>
                    <tr>
                        <th>Registered ID</th>
                        <th>Station Type</th>
                        <th>Location</th>
                        <th>Capacity</th>
                        <th>Eligible Fuel Capacity</th>
                        <th>Fuel Type</th>
                        <th>Owner's Name</th>
                        <th>Owner's Contact</th>
                        <th>Details</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedStations.length > 0 ? (
                        paginatedStations.map((station) => (
                            <tr key={station.stationId}>
                                <td>{station.registeredId}</td>
                                <td>{station.stationType}</td>
                                <td>{station.location}</td>
                                <td>{station.capacity}</td>
                                <td>{station.eligibleFuelCapacity}</td>
                                <td>{station.fuelType}</td>
                                <td>{station.fuelStationOwner.name}</td>
                                <td>{station.fuelStationOwner.contact}</td>
                                <td>
                                    <StationDetails stationId={station.stationId} />
                                </td>
                                <td>
                                    <UpdateStationStatus
                                        station={station}
                                        onUpdate={(stationId, newStatus) => {
                                            // Handle the update action if needed in the parent component
                                            console.log(`Station ${stationId} updated to ${newStatus}`);
                                        }}
                                    />
                                </td>
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
            </div>

            {/* Pagination */}
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredStations.length}
                onChange={handlePageChange}
                className="activate-btn"
                style={{ marginTop: "1rem", textAlign: "right" }}
            />

        </div>
    );
}

export default InactiveFuelStations;
