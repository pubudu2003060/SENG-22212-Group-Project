import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../Styles/Dashboard.css';
import NavigationBar from '../Components/NavigationBar';
import WebFooter from '../Components/WebFooter';
import WebHeader from '../Components/WebHeader';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/getVehicalFualQuata/1");
                console.log(response.data)
                setUserData(response.data);
            } catch (e) {
                console.error("Error fetching user data:", e.message);
                navigate("/PageNotFound");
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="dashboard">
            <WebHeader/>
            <NavigationBar/>
            <div className="dashboard-body">
                <h2 id="dashboard-h2">
                    Welcome <span id="dashboard-name">{userData.name}</span>...
                </h2>
                <h3 id="dashboard-h3Text">Your Vehicles</h3>
                <hr id="dashboard-longLine"/>
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
                <hr id="dashboard-smallLine"/>
            </div>
            <WebFooter/>
        </div>
    );
}

export default Dashboard;