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
        <div className = "vehicle">
            <NavigationBar/>
            <div className = "vehicle-body">
                <div id = "vehicle-interBody">
                    <h2 id = "vehicle-subHeading">Vehicle Details...</h2>
                    <div className = "vehicle-VehicleInfo">                        
                        <div className = "vehicle-form-group">
                            <label>Vehicle Number:</label><br />
                            <input type = "text" id="VehicleNo" placeholder="Enter vehicle number" defaultValue={VehicleData.vehicleNo}/>
                        </div><br />
                        <div className = "vehicle-form-group">
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
                        <div className = "vehicle-form-group">
                            <label>Chassis Number:</label><br />
                            <input type = "text" id="ChassisNo" placeholder="Enter chassis number" defaultValue={VehicleData.chassisNo} />
                        </div><br />
                        <div className = "vehicle-form-group">
                            <label>Engine Number:</label><br />
                            <input type = "text" id="EngineNo" placeholder="Enter engine number" defaultValue={VehicleData.engineNo} />
                        </div><br />
                        <div className = "vehicle-form-group">
                            <label>Fuel Type:</label><br />
                            <div className="vehicle-fuelButtons">
                                <button
                                    className={selectedFuelType === "Petrol" ? "vehicle-fuel-btn selected" : "vehicle-fuel-btn"}
                                    onClick={() => handleFuelTypeChange("Petrol")}
                                >
                                    Petrol
                                </button>
                                <button
                                    className={selectedFuelType === "Diesel" ? "vehicle-fuel-btn selected" : "vehicle-fuel-btn"}
                                    onClick={() => handleFuelTypeChange("Diesel")}
                                >
                                    Diesel
                                </button>
                            </div>
                        </div><br />
                        <div className="vehicle-form-group" id = "vehicle-checkbox">
                            <input type="checkbox" id="agreeTerms" value="agree" />
                            <label htmlFor="agreeTerms">I certify that the updated vehicle information provided is accurate and up-to-date.</label>
                        </div>
                        <div className="vehicle-button-group">                            
                            <button id="vehicle-save-btn" className={isEditing ? "vehicle-active-btn" : ""} onClick={handleSaveClick} disabled={!isEditing}>Save</button>
                            <button id="vehicle-edit-btn" onClick={handleEditClick} disabled={isEditing}>Edit</button>
                        </div>
                        <hr id = "vehicle-hr"/>  
                    </div> 
                    <div className = "vehicle-footer-btn">
                        <button id = "vehicle-cancel-btn">Cancel</button>
                        <button id = "vehicle-add-btn">Add Vehicles</button>
                    </div> 
                </div>                       
            </div>
        </div>
    );
}

export default VehicleInfomation;