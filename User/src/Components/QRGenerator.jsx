import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosHeaders as Buffer} from "axios";
import "../Styles/QRGenerator.css";

import {useLocation} from "react-router-dom";

function QRGenerator() {

    const navigate = useNavigate();
    const [qrValue, setQrValue] = useState("");
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");
    const location = useLocation();
    const vehicleId = location.state?.vehicalNo;

    useEffect(() => {
        const fetchQrCode = async () => {

            if (!vehicleId) {
                setError("Vehicle ID not found. Please register your vehicle first.");
                console.log(vehicleId)
                navigate("/VehicleDetailsForm");
                return;
            }


            try {
                let token = sessionStorage.getItem("jwtToken")
                console.log(token)
                const response = await axios.get(
                    `https://pass-my-fule-backend.onrender.com/api/v1/user/generateQrCodeByVehicalId/${vehicleId}`,
                    {responseType: 'arraybuffer',

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const base64Image = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                const imageUrl = `data:image/png;base64,${base64Image}`;

                setQrValue(imageUrl); // Use correct state setter
                setLoading(false);

            } catch (error) {
                console.error("Error fetching QR code:", error);
                setError("Failed to generate QR code. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchQrCode();
    }, [vehicleId]); // Remove navigate from dependencies


    const downloadQRCode = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href = qrValue;
        downloadLink.download = "qr-code.png";
        downloadLink.click();
    };

    const shareQRCode = async () => {
        try {
            const response = await fetch(qrValue);
            const blob = await response.blob();
            const file = new File([blob], "qr-code.png", {type: "image/png"});
            await navigator.share({
                files: [file],
                title: "QR Code",
                text: "Here is your QR code",
            });
        } catch (error) {
            console.error("Sharing failed", error);
            setError("Sharing is not supported on this device or browser.");
        }
    };

    return (

        <div className="qr-container" style={{position: "relative"}}>

            <h1 className="qr-title">Your QR Code</h1>
            {loading ? (
                <p>Loading QR Code...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : qrValue ? (
                <div>
                    <img
                        id="qr-code"
                        src={qrValue}
                        alt="Generated QR Code"
                        className="qr-code"
                    />
                    <div className="qr-buttons">
                        <div className="qr-buttons-column">
                            <button onClick={downloadQRCode} className="qr-button">
                                Download
                            </button>
                            <button onClick={shareQRCode} className="qr-button">
                                Share
                            </button>
                        </div>

                        <p className="hint">
                            Click <strong>Dashboard</strong> to go to your dashboard and see all details related to your
                            vehicles.
                        </p>
                    </div>
                </div>
            ) : (
                <p>Failed to load QR code. Please try again later.</p>
            )}

            <button
                onClick={() => navigate("/dashboard")}
                style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Dashboard
            </button>

        </div>
    );
}

export default QRGenerator;
