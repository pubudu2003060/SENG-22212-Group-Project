import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, message } from 'antd';

function UpdateStationStatus({ station, onUpdate }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setLoading(true);
        const newStatus = station.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
        
        axios.put(`https://pass-my-fule-backend.onrender.com/api/v1/updateStatus/${station.stationId}?status=${newStatus}`)
            .then(response => {
                message.success(`Station status updated to ${newStatus}`);
                onUpdate(station.stationId, newStatus); // Update parent state
            })
            .catch(error => {
                message.error("Failed to update status");
                console.error("Error updating status:", error);
            })
            .finally(() => {
                setLoading(false);
                setIsModalVisible(false);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button 
                type="default"
                onClick={showModal}
                style={station.status === "ACTIVE" ? { backgroundColor: 'red', color: 'white' } : {backgroundColor: 'green', color: 'white'}}
            >
                {station.status === "ACTIVE" ? "Deactivate" : "Activate"}
            </Button>
            
            <Modal
                title={`${station.status === "ACTIVE" ? "Deactivate" : "Activate"} Station`}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                <p>Are you sure you want to {station.status === "ACTIVE" ? "deactivate" : "activate"} this station?</p>
                <p><strong>Registered ID:</strong> {station.registeredId}</p>
                <p><strong>Owner's Name:</strong> {station.fuelStationOwner.name}</p>
            </Modal>
        </>
    );
}

export default UpdateStationStatus;
