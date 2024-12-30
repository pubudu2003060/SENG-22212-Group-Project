import './VehicleInfomation.css';
import NavigationBar from './NavigationBar';
import {useState} from 'react';

function VehicleInfomation() {
    const VehicleData = {
        vehicleNo: "",
        vehicleType: "",
        chassisNo: "",
        engineNo: "",
        fuelType: ""
    };

    const [selectedVehicleType, setSelectedVehicleType] = useState(VehicleData.vehicleType); 
    const [selectedFuelType, setSelectedFuelType] = useState(VehicleData.fuelType);
    const [isEditing, setIsEditing] = useState(false);

    const handleVehicleTypeChange = (type) => {
        setSelectedVehicleType(type.target.value);
    };

    const handleFuelTypeChange = (fuelType) => {
        setSelectedFuelType(fuelType);
    };

    const handleEditClick = () => {
        setIsEditing(true); 
    };

    const handleSaveClick = () => {
        setIsEditing(false); 
    };

    return (  
        <div>
            <NavigationBar/>
            <div className = "body">
                <div id = "interBody">
                    <h2 id = "subHeading">Vehicle Details...</h2>
                    <div className = "VehicleInfo">                        
                        <div className = "form-group">
                            <label>Vehicle Number:</label><br />
                            <input type = "text" id="VehicleNo" placeholder="Enter vehicle number" defaultValue={VehicleData.vehicleNo}/>
                        </div><br />
                        <div className = "form-group">
                            <label>Vehicle Type:</label><br />
                            <select
                                id="VehicleType"
                                value={selectedVehicleType}
                                onChange={handleVehicleTypeChange}
                                className="styled-select"
                            >
                                <option value="" disabled selected>Select a vehicle type</option>
                                <option value="MotorBicycle">Motor Bicycle</option>
                                <option value="ThreeWheel">Threewheel</option>
                                <option value="Car">Car</option>                            
                                <option value="Van">Van</option>
                                <option value="Lorry">Lorry</option>
                                <option value="Bus">Bus</option>
                                <option value="Tractor">Tractor</option>
                            </select>
                        </div><br />
                        <div className = "form-group">
                            <label>Chassis Number:</label><br />
                            <input type = "text" id="ChassisNo" placeholder="Enter chassis number" defaultValue={VehicleData.chassisNo} />
                        </div><br />
                        <div className = "form-group">
                            <label>Engine Number:</label><br />
                            <input type = "text" id="EngineNo" placeholder="Enter engine number" defaultValue={VehicleData.engineNo} />
                        </div><br />
                        <div className = "form-group">
                            <label>Fuel Type:</label><br />
                            <div className="fuelButtons">
                                <button
                                    className={selectedFuelType === "Petrol" ? "fuel-btn selected" : "fuel-btn"}
                                    onClick={() => handleFuelTypeChange("Petrol")}
                                >
                                    Petrol
                                </button>
                                <button
                                    className={selectedFuelType === "Diesel" ? "fuel-btn selected" : "fuel-btn"}
                                    onClick={() => handleFuelTypeChange("Diesel")}
                                >
                                    Diesel
                                </button>
                            </div>
                        </div><br />
                        <div className="form-group">
                            <input type="checkbox" id="agreeTerms" value="agree" />
                            <label htmlFor="agreeTerms">I certify that the updated vehicle information provided is accurate and up-to-date.</label>
                        </div>
                        <div className="button-group">                            
                            <button id="save-btn" className={isEditing ? "active-btn" : ""} onClick={handleSaveClick} disabled={!isEditing}>Save</button>
                            <button id="edit-btn" onClick={handleEditClick} disabled={isEditing}>Edit</button>
                        </div>
                        <hr />  
                    </div> 
                    <div className = "footer-btn">
                        <button id = "cancel-btn">Cancel</button>
                        <button id = "add-btn">Add Vehicles</button>
                    </div> 
                </div>                       
            </div>
        </div>
    );
}

export default VehicleInfomation;