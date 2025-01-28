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
            } catch (error) {
                console.error("Error fetching user data:", error.message);
                navigate("/PageNotFound");
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

                {userData.map((vehicle, index) => (
                    <div className="dashboard-vehicleInfo" key={index}>
                        <div>
                            <p id="dashboard-p">Vehicle Type: {vehicle.vehicalType}</p>
                            <p id="dashboard-p">Eligible Fuel Amount: {vehicle.eligibleFuelQuota} L</p>
                            <p id="dashboard-p">Remain Fuel Balance: {vehicle.remainFuel} L</p>
                            <p id="dashboard-p">Eligible Days: {vehicle.eligibleDays}</p>
                        </div>
                        <div>
                            <p id="dashboard-p">Vehicle No: {vehicle.vehicalNo}</p>
                            <p id="dashboard-p">
                                <button onClick={() => navigate('/QRGenerator', {state: {vehicalId: vehicle.vehicalId}})} style={{backgroundColor: "#d90032", color: "white", padding: "8px 16px", fontSize: "14px", border: "none", borderRadius: "5px", cursor: "pointer", transition: "0.3s ease",}} onMouseOver={(e) => e.target.style.backgroundColor = "#b00028"} onMouseOut={(e) => e.target.style.backgroundColor = "#d90032"}> View</button> QR Code
                            </p>
                        </div>
                    </div>
                ))}

                <hr id="dashboard-smallLine"/>
            </div>
            <WebFooter/>
        </div>
    );
}

export default Dashboard;