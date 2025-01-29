import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'qr_details.dart';  

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  final TextEditingController vehicleNumberController = TextEditingController();
  final MobileScannerController cameraController = MobileScannerController();

  bool isProcessing = false;
  bool isScanning = false; 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Scanner'),
        actions: [          
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              setState(() {                
                isScanning = false;
                vehicleNumberController.clear();
              });
            },
          ),
        ],
      ),
      body: Stack(
        children: [          
          Positioned(
            top: 70,
            left: MediaQuery.of(context).size.width * 0.05,
            right: MediaQuery.of(context).size.width * 0.05,
            child: Container(
              color: Colors.black.withOpacity(isScanning ? 1 : 0.5), 
              width: MediaQuery.of(context).size.width * 0.9,
              height: MediaQuery.of(context).size.height * 0.6,
              child: MobileScanner(
                controller: cameraController,
                onDetect: (BarcodeCapture barcodeCapture) {
                  if (isProcessing) return;
                  setState(() => isProcessing = true);

                  final barcode = barcodeCapture.barcodes.first;
                  if (barcode.rawValue != null && barcode.rawValue!.isNotEmpty) {
                    final vehicleNumber = _extractVehicleNumber(barcode.rawValue!);
                    if (vehicleNumber != null) {
                      setState(() {
                        vehicleNumberController.text = vehicleNumber;
                      });
                      _showSnackBar("Scanned: $vehicleNumber");
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
          ),

          if (!isScanning)
            Positioned.fill(
              top: MediaQuery.of(context).size.height * 0,
              child: Container(
                color: Colors.black.withOpacity(0.2), 
                child: Center(
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(255, 64, 146, 198),
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 33),
                    ),
                    onPressed: () {
                      setState(() => isScanning = true);
                    },
                    child: const Text(
                      "SCAN",
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 15.0,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          
          Positioned(
            bottom: 80,
            left: 16,
            right: 16,
            child: vehicleNumberController.text.isEmpty
                ? TextField(
                    controller: vehicleNumberController,
                    readOnly: true,
                    textAlign: TextAlign.center,
                    decoration: const InputDecoration(
                      labelText: "Scanned Vehicle Number",
                      border: OutlineInputBorder(),
                      filled: true,
                      fillColor: Colors.white,
                    ),
                  )
                : GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => DetailsScreen(
                            vehicleNumber: vehicleNumberController.text,
                          ),
                        ),
                      );
                    },
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          vehicleNumberController.text,
                          style: const TextStyle(fontSize: 16, color: Colors.black),
                        ),
                        const Icon(
                          Icons.arrow_forward_ios,
                          size: 16,
                          color: Colors.blue,
                        ),
                      ],
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
