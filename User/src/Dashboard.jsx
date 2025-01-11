import './Dashboard.css';
import NavigationBar from './NavigationBar';
import WebFooter from './WebFooter';

const name = "Viduni Niketha";
const vehicleType = "";
const fuelBalance = "";
const eligibleDays = "";
const vehicleNo = "";

function Dashboard() {
    return ( 
        <div className = "dashboard">
            <NavigationBar />
            <div className = "dashboard-body">
                <div>
                    <h2 id = "dashboard-h2">Welcome <span id = "dashboard-name">{name}</span>....</h2>
                    <h3 id = "dashboard-h3Text">Your Vehicles</h3>
                    <hr id = "dashboard-longLine"/>
                    <div className = "dashboard-vehicleInfo">
                        <div>
                            <p id = "dashboard-p">Vehicle Type: {vehicleType}</p>
                            <p id = "dashboard-p">Fuel Balance: {fuelBalance}</p>
                            <p id = "dashboard-p">Eligible Days: {eligibleDays}</p>
                        </div>
                        <div>
                            <p id = "dashboard-p">Vehicle No: {vehicleNo}</p>
                            <p id = "dashboard-p"><a href = "">View</a> QR Code</p>
                        </div>
                    </div>
                    <hr id = "dashboard-smallLine"/>
                    <div className = "dashboard-vehicleInfo">
                        <div>
                            <p id = "dashboard-p">Vehicle Type: {vehicleType}</p>
                            <p id = "dashboard-p">Fuel Balance: {fuelBalance}</p>
                            <p id = "dashboard-p">Eligible Days: {eligibleDays}</p>
                        </div>
                        <div>
                            <p id = "dashboard-p">Vehicle No: {vehicleNo}</p>
                            <p id = "dashboard-p"><a href = "">View</a> QR Code</p>
                        </div>
                    </div>
                    <hr id = "dashboard-smallLine"/>                 
                </div>           
            </div>
            <WebFooter />
        </div>
        
     );
}

export default Dashboard;