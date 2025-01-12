import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavigationBar from './NavigationBar';
import WebFooter from './WebFooter';
import WebHeader from './WebHeader';

function Dashboard() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        vehicles: [],
    });

    const mockData = {
        name: "Viduni Niketha",
        vehicles: [
            {
                type: "Car",
                fuelBalance: "20L",
                eligibleDays: "Mon, Thu",
                vehicleNo: "ABC-1234",
            },
            {
                type: "Bike",
                fuelBalance: "5L",
                eligibleDays: "Tue",
                vehicleNo: "XYZ-5678",
            },
        ],
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = true; 
                if (!response) {
                    throw new Error("User data not found");
                }
                setUserData(mockData);
            } catch (e) {
                console.error("Error fetching user data:", e.message);
                navigate("/PageNotFound");
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="dashboard">
            <WebHeader />
            <NavigationBar />
            <div className="dashboard-body">
                <h2 id="dashboard-h2">
                    Welcome <span id="dashboard-name">{userData.name}</span>...
                </h2>
                <h3 id="dashboard-h3Text">Your Vehicles</h3>
                <hr id="dashboard-longLine" />
                {userData.vehicles.map((vehicle, index) => (
                    <div className="dashboard-vehicleInfo" key={index}>
                        <div>
                            <p id="dashboard-p">Vehicle Type: {vehicle.type}</p>
                            <p id="dashboard-p">Fuel Balance: {vehicle.fuelBalance}</p>
                            <p id="dashboard-p">Eligible Days: {vehicle.eligibleDays}</p>
                        </div>
                        <div>
                            <p id="dashboard-p">Vehicle No: {vehicle.vehicleNo}</p>
                            <p id="dashboard-p">
                                <a href="">View</a> QR Code
                            </p>
                        </div>
                    </div>
                ))}
                <hr id="dashboard-smallLine" />
            </div>
            <WebFooter />
        </div>
    );
}

export default Dashboard;