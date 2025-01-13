import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get the dynamic vehicleId
import { QRCodeCanvas } from "qrcode.react";
import "../Styles/QRGenerator.css";

function QRGenerator() {
    const navigate = useNavigate();
    const { vehicleId } = useParams(); // Dynamic vehicle ID from the route parameters
    const [qrValue, setQrValue] = useState(""); // To store the QR code image URL
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch QR Code value for the dynamic vehicleId from the backend
    useEffect(() => {
        const fetchQRCode = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/generateQrCodeByVehicalId/${vehicleId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch QR code.");
                }
                const data = await response.arrayBuffer(); // Byte array response
                const blob = new Blob([data], { type: "image/png" });
                const qrCodeUrl = URL.createObjectURL(blob); // Create a URL for the image
                setQrValue(qrCodeUrl); // Set the blob URL to be displayed as the QR code
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchQRCode();
    }, [vehicleId]);

    // Download the QR code image
    const downloadQRCode = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/generateQRCodeImageByVehicalId/${vehicleId}`);
            if (!response.ok) {
                throw new Error("Failed to download QR code.");
            }
            const data = await response.json(); // Assuming response has a message and download URL
            const downloadLink = document.createElement("a");
            downloadLink.href = qrValue; // Blob URL of QR code
            downloadLink.download = `qr-code-vehicle-${vehicleId}.png`; // Dynamic filename based on vehicleId
            downloadLink.click();
        } catch (err) {
            console.error("Download failed", err);
        }
    };

    // Share QR code using Web Share API
    const shareQRCode = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/generateQRCodeImageByVehicalId/${vehicleId}`);
            if (!response.ok) {
                throw new Error("Failed to share QR code.");
            }
            const data = await response.json();
            const file = new File([qrValue], `qr-code-vehicle-${vehicleId}.png`, { type: "image/png" });
            await navigator.share({
                files: [file],
                title: `QR Code for Vehicle ${vehicleId}`,
                text: "Here is your QR code",
            });
        } catch (error) {
            console.error("Sharing failed", error);
        }
    };

    if (isLoading) {
        return <p>Loading QR Code...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="qr-container">
            <h1 className="qr-title">Your QR Code</h1>
            <QRCodeCanvas
                id="qr-code"
                value={qrValue}
                size={200}
                level={"H"}
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
    );
}

export default QRGenerator;
