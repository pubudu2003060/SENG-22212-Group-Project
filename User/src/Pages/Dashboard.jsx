import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Dashboard.css';
import NavigationBar from '../Components/NavigationBar';
import WebFooter from '../Components/WebFooter';
import WebHeader, { getSessionData } from '../Components/WebHeader';
import axios from 'axios';

function Dashboard() {

    const { userId, userContactNumber, firstName, lastName } = getSessionData();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const url = `http://localhost:8080/api/v1/getVehicalFualQuata/${userId}`;
                const response = await axios.get(url);
                setUserData(response.data);
                console.log(userData)
            } catch (error) {
                console.error("Error fetching user data:", error.message);

            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard">
            <WebHeader />
            <NavigationBar />
            <div className="dashboard-body">
                <h2 id="dashboard-h2">
                    Welcome <span id="dashboard-name">{firstName + " " + lastName}</span>
                </h2>
                <h3 id="dashboard-h3Text">Your Vehicles</h3>
                <hr id="dashboard-longLine" />

                {userData?.vehicles?.map((vehicle, index) => (
                    <div className="dashboard-vehicleInfo" key={index}>
                        <div>
                            <p id="dashboard-p">Vehicle Type: {vehicle.type}</p>
                            <p id="dashboard-p">Fuel Balance: {vehicle.fuelBalance}</p>
                            <p id="dashboard-p">Eligible Days: {vehicle.eligibleDays}</p>
                        </div>
                        <div>
                            <p id="dashboard-p">Vehicle No: {vehicle.vehicleNo}</p>
                            <p id="dashboard-p">
                                <a href="#">View</a> QR Code
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