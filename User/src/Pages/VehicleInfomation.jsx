import '../Styles/VehicleInfomation.css';
import NavigationBar from '../Components/NavigationBar';
import WebFooter from '../Components/WebFooter';
import WebHeader, {getSessionData} from '../Components/WebHeader';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function VehicleInfomation() {

    const {userId, userContactNumber, firstName, lastName} = getSessionData();
    const navigate = useNavigate();
    const [vehicleData, setVehicleData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let token = sessionStorage.getItem("jwtToken")
                setIsLoading(true);
                const url = `http://pass-my-fule-backend.onrender.com/api/v1/user/getBuyQuotosByVehical/${userId}`;
                const response = await axios.get(url,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setVehicleData(response.data);
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
        <div className="vehicle">
            <WebHeader/>
            <NavigationBar/>
            <div className="vehicle-body">
                <div id="vehicle-interBody">
                    <h2 id="vehicle-subHeading">Vehicle Fuel Details</h2>
                    <table className="vehicle-table">
                        <thead>
                        <tr>
                            <th>Vehicle No</th>
                            <th>Vehicle Type</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Fuel Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicleData.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.vehicalNo}</td>
                                <td>{vehicle.vehicalType}</td>
                                <td>{vehicle.amount}</td>
                                <td>{vehicle.date}</td>
                                <td>{vehicle.fualType}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <WebFooter/>
        </div>
    );
}

export default VehicleInfomation;
