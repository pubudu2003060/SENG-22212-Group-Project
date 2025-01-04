import './Dashboard.css';
import NavigationBar from './NavigationBar';

const name = "Viduni Niketha";
const vehicleType = "";
const fuelBalance = "";
const eligibleDays = "";
const vehicleNo = "";

function Dashboard() {
    return ( 
        <div>
            <NavigationBar />
            <div className = "body">
            <div>
                <h2>Welcome <span id = "name">{name}</span>....</h2>
                <h3 id = "h3Text">Your Vehicles</h3>
                <hr id = "longLine"/>
                <div className = "vehicleInfo">
                    <div>
                        <p>Vehicle Type: {vehicleType}</p>
                        <p>Fuel Balance: {fuelBalance}</p>
                        <p>Eligible Days: {eligibleDays}</p>
                    </div>
                    <div>
                        <p>Vehicle No: {vehicleNo}</p>
                        <p><a href = "">View</a> QR Code</p>
                    </div>
                </div>
                <hr id = "smallLine"/>
            </div>

        </div>
        </div>
        
     );
}

export default Dashboard;