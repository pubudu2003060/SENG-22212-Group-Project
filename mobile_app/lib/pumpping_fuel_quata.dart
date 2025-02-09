import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class PumpingFuelQuota extends StatefulWidget {
  final int remainFuel;
  final int customerFuelQuotaId;

  const PumpingFuelQuota(
      {super.key, required this.remainFuel, required this.customerFuelQuotaId});

  @override
  _PumpingFuelQuotaState createState() => _PumpingFuelQuotaState();
}

class _PumpingFuelQuotaState extends State<PumpingFuelQuota> {
  final TextEditingController fuelLitersController = TextEditingController();
  final FocusNode _focusNode = FocusNode();
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
    _focusNode.dispose();
    super.dispose();
  }

  void _onKeyPressed(String value) {
    setState(() {
      if (value == "x") {
        if (fuelLitersController.text.isNotEmpty) {
          fuelLitersController.text = fuelLitersController.text
              .substring(0, fuelLitersController.text.length - 1);
        }
      } else if (value == ".") {
        if (!fuelLitersController.text.contains(".")) {
          fuelLitersController.text += value;
        }
      } else {
        fuelLitersController.text += value;
      }
    });
  }

  int calculateRemainingFuel() {
    double pumpedFuel = double.tryParse(fuelLitersController.text) ?? 0;
    int remain = (widget.remainFuel - pumpedFuel).toInt();

    if (remain < 0) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Pumped fuel is more than remaining fuel.')),
      );
      return 0;
    } else {
      return remain;
    }
  }

  Future<void> updateFuelData(int customerFuelQuotaId, int newRemainFuel) async {
    if (jwtToken == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Authentication error. Please login again.')),
      );
      return;
    }

    print(customerFuelQuotaId.toString() + " " + newRemainFuel.toString());

    final urlUpdate = Uri.parse(
        'http://192.168.1.173:8080/api/v1/fuelstation/updateCustomerFueldata/$customerFuelQuotaId/$newRemainFuel');
    
    try {
      final responseUpdate = await http.get(
        urlUpdate,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $jwtToken',
        },
      );

      if (responseUpdate.statusCode == 200) {
        final result = json.decode(responseUpdate.body);

        if (result.toString() == '1') {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Fuel data updated successfully.')),
          );

          final prefs = await SharedPreferences.getInstance();

          int? customerFuelQuotaId = prefs.getInt('customerFuelQuotaId');
          int? pumpedFuel = prefs.getInt('pumpedFuel');
          String? registeredId = prefs.getString('registeredId');
          String? fuelType = prefs.getString('fuelType');

          addBuyQuota(customerFuelQuotaId!, pumpedFuel!, registeredId!, fuelType!);

          Navigator.pushNamedAndRemoveUntil(
            context,
            '/qr_scanner',
            (route) => false,
          );
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Failed to update fuel data.')),
          );
        }
      } else if (responseUpdate.statusCode == 401) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Authentication expired. Please login again.')),
        );
        // Navigate to login screen here if needed
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Error occurred while updating fuel data.')),
        );
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Network error: $error')),
      );
    }
  }

  Future<void> saveData() async {
    int pumpedFuel = int.tryParse(fuelLitersController.text) ?? 0;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('customerFuelQuotaId', widget.customerFuelQuotaId);
    await prefs.setInt('pumpedFuel', pumpedFuel);
  }

  Future<void> addBuyQuota(int customerFuelQuotaId, int amount, String registeredId, String fuelType) async {
    if (jwtToken == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Authentication error. Please login again.')),
      );
      return;
    }

    final payload = {
      'customerFuelQuotaId': customerFuelQuotaId,
      'amount': amount,
      'registeredId': registeredId,
      'fuelType': fuelType
    };

    final url = Uri.parse('http://192.168.1.173:8080/api/v1/fuelstation/addbuyquotes');
    
    try {
      final response = await http.post(
        url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $jwtToken',
        },
        body: json.encode(payload),
      );

      if (response.statusCode == 200) {
        final result = json.decode(response.body);
        
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Buy quota added successfully.')),
          );
        
      } else if (response.statusCode == 401) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Authentication expired. Please login again.')),
        );
        
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Error occurred while adding buy quota.')),
        );
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Network error: $error')),
      );
    }
  }

  // Rest of the widget code remains the same...
  @override
  Widget build(BuildContext context) {
    saveData();
  
    print(widget.customerFuelQuotaId.toString() +
        " yyyy " +
        widget.remainFuel.toString());
    return Scaffold(
      appBar: AppBar(
        title: const Text('Pumping Fuel Quota'),
        backgroundColor: const Color.fromARGB(255, 80, 171, 227),
      ),
      body: Padding(
        padding: const EdgeInsets.only(
            top: 70.0, bottom: 16.0, left: 16.0, right: 16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: const EdgeInsets.all(30.0),
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 255, 255, 255).withOpacity(0.2),
                borderRadius: BorderRadius.circular(8.0),
                border: Border.all(color: Colors.blue, width: 2.0),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Enter Pumped Fuel Liters',
                    style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 30.0),
                  TextField(
                    controller: fuelLitersController,
                    keyboardType: TextInputType.none,
                    focusNode: _focusNode,
                    readOnly: true,
                    decoration: const InputDecoration(
                      hintText: 'Enter fuel liters',
                      border: OutlineInputBorder(),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                    ),
                    onTap: () {
                      FocusScope.of(context).requestFocus(_focusNode);
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20.0),
            if (_focusNode.hasFocus) _buildCustomKeyboard(),
            const SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: () {
                if (fuelLitersController.text.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Please fill in the fuel liters.')),
                  );
                } else {
                  int newRemainFuel = calculateRemainingFuel();
                  if(newRemainFuel != 0){
                    updateFuelData(widget.customerFuelQuotaId, newRemainFuel);
                  }
                }
              },
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 80, vertical: 12),
                backgroundColor: const Color.fromARGB(255, 64, 146, 198),
              ),
              child: const Text(
                'Submit',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 20.0,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCustomKeyboard() {
    final List<String> keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "x"];

    return Container(
      color: Colors.grey[200],
      padding: const EdgeInsets.all(8.0),
      child: GridView.builder(
        shrinkWrap: true,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          mainAxisSpacing: 10.0,
          crossAxisSpacing: 10.0,
          childAspectRatio: 1.75,
        ),
        itemCount: keys.length,
        itemBuilder: (context, index) {
          final keyLabel = keys[index];
          return ElevatedButton(
            onPressed: () {
              _onKeyPressed(keyLabel);
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.blue,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.0),
              ),
            ),
            child: Text(
              keyLabel,
              style: const TextStyle(fontSize: 25.0, color: Colors.white),
            ),
          );
        },
      ),
    );
  }
}