import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
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
  String? jwtToken;

  @override
  void initState() {
    super.initState();
    _loadJwtToken();
  }

  Future<void> _loadJwtToken() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      jwtToken = prefs.getString('jwttoken');
    });
  }

  @override
  void dispose() {
    cameraController.dispose();
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
                cameraController.start();
              });
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: MobileScanner(
              controller: cameraController,
              onDetect: (BarcodeCapture barcodeCapture) async {
                if (isProcessing) return;
                setState(() => isProcessing = true);

                final barcode = barcodeCapture.barcodes.first;
                if (barcode.rawValue != null && _isInteger(barcode.rawValue!)) {
                  final customerFuelQuotaId = barcode.rawValue!;
                  cameraController.stop();

                  _fetchDetailsAndNavigate(customerFuelQuotaId);
                } else {
                  _showSnackBar("Invalid QR Code! Vehicle not found!");
                  setState(() => isProcessing = false);
                }
              },
            ),
          ),
        ],
      ),
    );
  }

  bool _isInteger(String value) {
    return RegExp(r'^\d+$').hasMatch(value);
  }

  Future<void> _fetchDetailsAndNavigate(String customerFuelQuotaId) async {
    if (jwtToken == null) {
      _showSnackBar("Authentication error. Please login again.");
      setState(() => isProcessing = false);
      return;
    }

    final url = Uri.parse(
        "http://192.168.1.173:8080/api/v1/fuelstation/getDetailsbycfcid?customerFuelQuotaId=$customerFuelQuotaId");

    try {
      final response = await http.get(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $jwtToken',
        },
      );

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
      } else if (response.statusCode == 401) {
        _showSnackBar("Authentication expired. Please login again.");
        // Here you might want to navigate back to login screen
      } else {
        _showSnackBar("Failed to fetch details. Status: ${response.statusCode}");
        setState(() => isProcessing = false);
      }
    } catch (error) {
      _showSnackBar("Network error: $error");
      setState(() => isProcessing = false);
    }
  }

  void _showSnackBar(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }
}