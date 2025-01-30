import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'qr_details.dart';

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  final MobileScannerController cameraController = MobileScannerController();
  bool isProcessing = false;

  @override
  void dispose() {
    cameraController.dispose(); // Remove camera access when leaving the page
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR Scanner'),
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              setState(() {
                isProcessing = false;
                cameraController.start(); // Restart camera if needed
              });
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          // QR Scanner
          Positioned.fill(
            child: MobileScanner(
              controller: cameraController,
              onDetect: (BarcodeCapture barcodeCapture) async {
                if (isProcessing) return;
                setState(() => isProcessing = true);

                final barcode = barcodeCapture.barcodes.first;
                if (barcode.rawValue != null && _isInteger(barcode.rawValue!)) {
                  final customerFuelQuotaId = barcode.rawValue!;
                  cameraController.stop(); // Stop camera once QR is read

                  _fetchDetailsAndNavigate(customerFuelQuotaId);
                } else {
                  _showSnackBar("Invalid QR Code! Vehical not found!.");
                  setState(() => isProcessing = false);
                }
              },
            ),
          ),
        ],
      ),
    );
  }

  // Check if the scanned QR is an integer
  bool _isInteger(String value) {
    return RegExp(r'^\d+$').hasMatch(value);
  }

  // Fetch details from API and navigate to next page
  Future<void> _fetchDetailsAndNavigate(String customerFuelQuotaId) async {
    final url = Uri.parse(
        "http://192.168.1.173:8080/api/v1/getDetailsbycfcid?customerFuelQuotaId=$customerFuelQuotaId");

    try {
      final response = await http.get(url);

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        print(data);
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => DetailsScreen(
              customerFuelQuotaId: int.parse(customerFuelQuotaId),
              firstName: data['firstName'],
              lastName: data['lastName'],
              idNo: data['idNo'],
              vehicalType: data['vehicalType'],
              vehicalNo: data['vehicalNo'],
              fualType: data['fualType'],
              eligibleDays: data['eligibleDays'],
              eligibleFuelQuota: data['eligibleFuelQuota'],
              remainFuel: data['remainFuel'],
            
            ),
          ),
        );
      } else {
        _showSnackBar("Failed to fetch details.");
        setState(() => isProcessing = false);
      }
    } catch (error) {
      _showSnackBar("Error: $error");
      setState(() => isProcessing = false);
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }
}
