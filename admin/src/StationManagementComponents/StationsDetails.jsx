import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function StationDetails({ stationId }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [stationDetails, setStationDetails] = useState(null);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true);
        fetchStationDetails();
    };

    const fetchStationDetails = () => {
        setLoading(true);
        axios.get(`http://localhost:8080/api/v1/getFuelStationDetails/${stationId}`)
            .then(response => {
                setStationDetails(response.data);
            })
            .catch(error => {
                message.error("Failed to fetch station details");
                console.error("Error fetching station details:", error);
                navigate("/details-not-found");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="default" style={{ backgroundColor: "gray", color: "white" }} onClick={showModal}>
                Details
            </Button>

            <Modal
                title="Station Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                {loading ? (
                    <Spin />
                ) : (
                    stationDetails && (
                        <div>
                            <p><strong>Station ID:</strong> {stationDetails.stationId}</p>
                            <p><strong>Registered ID:</strong> {stationDetails.registeredId}</p>
                            <p><strong>Station Type:</strong> {stationDetails.stationType}</p>
                            <p><strong>Location:</strong> {stationDetails.location}</p>
                            <p><strong>Status:</strong> {stationDetails.status}</p>
                            <p><strong>Capacity:</strong> {stationDetails.capacity}</p>
                            <p><strong>Eligible Fuel Capacity:</strong> {stationDetails.eligibleFuelCapacity}</p>
                            <p><strong>Fuel Type:</strong> {stationDetails.fuelType}</p><br/>
                            <p><strong>Station Owner's Details</strong></p>
                            <p><strong>Owner's Id:</strong> {stationDetails.fuelStationOwner.stationOwnerid}</p>
                            <p><strong>Owner's Name:</strong> {stationDetails.fuelStationOwner.name}</p>
                            <p><strong>NIC:</strong> {stationDetails.fuelStationOwner.nicNo}</p>
                            <p><strong>Owner's Contact:</strong> {stationDetails.fuelStationOwner.contact}</p>
                            <p><strong>Owner's Address:</strong> {stationDetails.fuelStationOwner.address}</p>       
                        </div>
                    )
                )}
            </Modal>
        </>
    );
}

export default StationDetails;
