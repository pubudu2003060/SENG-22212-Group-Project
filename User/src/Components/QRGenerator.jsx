import React from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import "../Styles/QRGenerator.css";

function QRGenerator() {
    const navigate = useNavigate();
    const qrValue = "https://example.com/vehicle-details"; // Replace with actual dynamic value

    // Function to download QR code as an image
    const downloadQRCode = () => {
        const canvas = document.getElementById("qr-code");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qr-code.png";
        downloadLink.click();
    };

    // Function to share the QR code
    const shareQRCode = async () => {
        try {
            const canvas = document.getElementById("qr-code");
            const blob = await new Promise((resolve) =>
                canvas.toBlob(resolve, "image/png")
            );
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
