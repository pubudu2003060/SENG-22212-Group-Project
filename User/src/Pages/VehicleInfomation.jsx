import '../Styles/VehicleInfomation.css';
import NavigationBar from '../Components/NavigationBar';
import WebFooter from '../Components/WebFooter';
import WebHeader from '../Components/WebHeader';

function VehicleInfomation() {
    const vehicleData = [
        {
            vehicleNo: "ABC1234",
            vehicleType: "Car",
            chassisNo: "CH123456789",
            engineNo: "EN987654321",
            fuelType: "Petrol"
        },
        {
            vehicleNo: "XYZ5678",
            vehicleType: "Motor Bicycle",
            chassisNo: "CH987654321",
            engineNo: "EN123456789",
            fuelType: "Diesel"
        }
    ];

    return (
        <div className="vehicle">
            <WebHeader/>
            <NavigationBar />
            <div className="vehicle-body">
                <div id="vehicle-interBody">
                    <h2 id="vehicle-subHeading">Vehicle Details</h2>
                    <table className="vehicle-table" >
                        <thead>
                            <tr>
                                <th>Vehicle No</th>
                                <th>Vehicle Type</th>
                                <th>Chassis No</th>
                                <th>Engine No</th>
                                <th>Fuel Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleData.map((vehicle, index) => (
                                <tr key={index}>
                                    <td>{vehicle.vehicleNo}</td>
                                    <td>{vehicle.vehicleType}</td>
                                    <td>{vehicle.chassisNo}</td>
                                    <td>{vehicle.engineNo}</td>
                                    <td>{vehicle.fuelType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <WebFooter />
        </div>
    );
}

export default VehicleInfomation;
