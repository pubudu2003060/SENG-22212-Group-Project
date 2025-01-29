import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  final TextEditingController vehicleNumberController = TextEditingController();
  final MobileScannerController cameraController = MobileScannerController();
  
  bool isProcessing = false; 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Scanner'),
        actions: [
          IconButton(
            icon: Icon(cameraController.torchEnabled ? Icons.flash_on : Icons.flash_off),
            onPressed: () => cameraController.toggleTorch(),
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: MobileScanner(
              controller: cameraController,
              onDetect: (BarcodeCapture barcodeCapture) {
                if (isProcessing) return;
                setState(() => isProcessing = true);

                final barcode = barcodeCapture.barcodes.first;
                if (barcode.rawValue != null && barcode.rawValue!.isNotEmpty) {
                  final vehicleNumber = _extractVehicleNumber(barcode.rawValue!);
                  if (vehicleNumber != null) {
                    vehicleNumberController.text = vehicleNumber; 
                    _showSnackBar("Vehicle Number: $vehicleNumber");
                  } else {
                    _showSnackBar("Invalid QR Code format!");
                  }
                } else {
                  _showSnackBar("No QR Code detected!");
                }

                setState(() => isProcessing = false);
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: vehicleNumberController,
              decoration: const InputDecoration(
                labelText: "Scanned Vehicle Number",
                border: OutlineInputBorder(),
              ),
            ),
          ),
        ],
      ),
    );
  }

  String? _extractVehicleNumber(String rawValue) {
    try {
      final parts = rawValue.split(',');
      for (var part in parts) {
        if (part.trim().startsWith("Vehicle No:")) {
          return part.split(':')[1].trim();
        }
      }
    } catch (e) {
      debugPrint("Error parsing QR code: $e");
    }
    return null;
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }
}
