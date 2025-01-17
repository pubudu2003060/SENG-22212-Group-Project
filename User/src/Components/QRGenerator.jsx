import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import "../Styles/QRGenerator.css";

function QRGenerator() {
    const navigate = useNavigate();
    const [qrValue, setQrValue] = useState(""); // Store QR code data
    const [loading, setLoading] = useState(true); // For loading state
    const vehicalId = sessionStorage.getItem("vehicleId"); // Retrieve vehicleId from session storage

    // Fetch QR Code data from API
    useEffect(() => {
        const fetchQrCode = async () => {
            if (!vehicalId) {
                alert("Vehicle ID not found. Please register your vehicle first.");
                navigate("/VehicleDetailsForm");
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:8080/api/v1/generateQrCodeByVehicalId/${vehicalId}`,
                    { responseType: "arraybuffer" } // Get binary data
                );

                // Convert the byte array to a base64 string
                const qrCodeBase64 = `data:image/png;base64,${btoa(
                    new Uint8Array(response.data)
                        .reduce((data, byte) => data + String.fromCharCode(byte), "")
                )}`;
                setQrValue(qrCodeBase64);
            } catch (error) {
                console.error("Error fetching QR code:", error);
                alert("Failed to generate QR code. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchQrCode();
    }, [vehicalId, navigate]);

    // Function to download QR code as an image
    const downloadQRCode = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href = qrValue;
        downloadLink.download = "qr-code.png";
        downloadLink.click();
    };

    // Function to share the QR code
    const shareQRCode = async () => {
        try {
            const response = await fetch(qrValue);
            const blob = await response.blob();
            const file = new File([blob], "qr-code.png", { type: "image/png" });
            await navigator.share({
                files: [file],
                title: "QR Code",
                text: "Here is your QR code",
            });
        } catch (error) {
            console.error("Sharing failed", error);
        }
    };

    return (
        <div className="qr-container">
            <h1 className="qr-title">Your QR Code</h1>
            {loading ? (
                <p>Loading QR Code...</p>
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
                            Click <strong>FINISH</strong> to go to your dashboard and see all details related to your vehicles.
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
