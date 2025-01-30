import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Select, Pagination, Button, Modal } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

import "../styles/StationManagement.css";

const { Option } = Select;

function ActiveFuelStations() {
    const [stations, setStations] = useState([]);
    const [filteredStations, setFilteredStations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({ location: "", stationType: "", fuelType: "" });
    const [locations, setLocations] = useState([]);
    const [stationTypes, setStationTypes] = useState([]);
    const [fuelTypes, setFuelTypes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Number of items per page

    // Fetch data from API
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/filterByStatus?status=ACTIVE")
            .then((response) => {
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
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

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

    const showModal = (station) => {
        setSelectedStation(station);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Handle the deactivation logic here, e.g., make an API call to deactivate the station
        console.log("Deactivating station:", selectedStation);
        setIsModalVisible(false);
        setSelectedStation(null);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedStation(null);
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
                                    <Button
                                        type="primary"
                                        onClick={() => showModal(station)}
                                        className="station-deactivate-btn"
                                    >
                                        Deactivate
                                    </Button>
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
                style={{ marginTop: "1rem", textAlign: "right" }}
            />

            {/* Modal for confirmation */}
            <Modal
                title="Deactivate Station"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to deactivate this station?</p>
                <p><strong>Registered ID:</strong> {selectedStation?.registeredId}</p>
                <p><strong>Owner's Name:</strong> {selectedStation?.fuelStationOwner.name}</p>
            </Modal>
        </div>
    );
}

export default ActiveFuelStations;
