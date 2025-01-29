import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {AxiosHeaders as Buffer} from "axios";
import "../Styles/QRGenerator.css";
import { useLocation } from "react-router-dom";

import {useLocation} from "react-router-dom";


function QRGenerator() {
    const navigate = useNavigate();
    const [qrValue, setQrValue] = useState("");
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const location = useLocation();
    const vehicleId = location.state?.vehicalId;

    useEffect(() => {
        const fetchQrCode = async () => {
            setError(""); // Clear previous errors
            setLoading(true);
            try {
                // Use the vehicleId from props/location state instead of sessionStorage
                if (!vehicleId) {
                    throw new Error("Vehicle ID not found");
                }


                const response = await axios.get(
                    `http://localhost:8080/api/v1/generateQrCode/${vehicleId}`,
                    { responseType: 'arraybuffer' }
                );

                const base64Image = btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                const imageUrl = `data:image/png;base64,${base64Image}`;

                setQrValue(imageUrl); // Changed from setQrImage to setQrValue


            } catch (error) {
                console.error("Error fetching QR code:", error);
                setError("Failed to generate QR code. Please try again.");
            } finally {
                setLoading(false);
            }
        };

<        if (vehicleId) {
            fetchQrCode();
        }
    }, [vehicleId]); // Removed navigate from dependencies since it's not used


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
        <div className="qr-container">
            <h1 className="qr-title">Your QR Code</h1>
            {loading ? (
                <p>Loading QR Code...</p>
            ) : error ? (
                <p className="error-message">{error}</p> // Show error message if any
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
                        <div className="qr-buttons-row">
                            <button
                                onClick={() => navigate("/VehicleDetailsForm")}
                                className="qr-button"
                            >
                                Back
                            </button>
                            <button
                                onClick={() => navigate("/Dashboard")}
                                className="qr-button finish-button"
                            >
                                Finish
                            </button>
                        </div>
                        <p className="hint">
                            Click <strong>FINISH</strong> to go to your dashboard and see all details related to your
                            vehicles.
                        </p>
                    </div>
                </div>
            ) : (
                <p>Failed to load QR code. Please try again later.</p>
            )}
        </div>
    );
}

export default QRGenerator;
