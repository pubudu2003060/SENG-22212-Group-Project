import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import "../styles/userManagement.css";
import cookies from "js-cookie";

function FuelStationOwners() {
  let token = cookies.get("token");
  if (!token) {
    console.error("Token not found in cookies!");
    navigate("/login");
  }
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;

  const [stationOwners, setStationOwners] = useState([]);
  const [filteredStationOwners, setFilteredStationOwners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Number of items per page

  // Fetch data from API
  useEffect(() => {
    const fetchStationOwners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/getfuelstationowners"
        );
        setStationOwners(response.data);
        setFilteredStationOwners(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching station owners:", error);
        //     navigate("/details-not-found");
      }
    };
    fetchStationOwners();
  }, [navigate]);

  //Handle search and filter
  useEffect(() => {
    let results = stationOwners;

    //Search by NIC or Registration No or Location
    if (searchQuery) {
      results = results.filter(
        (stationOwner) =>
          stationOwner.nicNo.toString().includes(searchQuery) ||
          stationOwner.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStationOwners(results);
  }, [searchQuery, stationOwners]);

  //Handle input changes
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const paginatedOwners = filteredStationOwners.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <h4 className="owner-heading">Station Owners</h4>

      {/* Search and filter inputs */}
      <div
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Input
          type="text"
          placeholder="Search by NIC or Name"
          value={searchQuery}
          onChange={handleSearchChange}
          prefix={<SearchOutlined />}
          style={{ marginRight: "1rem" }}
        />
      </div>

      {/* Table */}
      <table border="1" className="ownersTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Registration No</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOwners.length > 0 ? (
            paginatedOwners.map((stationOwner) => (
              <tr>
                <td>{stationOwner.firstName}</td>
                <td>{stationOwner.lastName}</td>
                <td>{stationOwner.nicNo}</td>
                <td>{stationOwner.contact}</td>
                <td>{stationOwner.address}</td>
                <td>{stationOwner.stationOwnerid}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
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

export default FuelStationOwners;
