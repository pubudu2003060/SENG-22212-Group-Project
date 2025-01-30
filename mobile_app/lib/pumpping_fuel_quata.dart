import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

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

  @override
  void dispose() {
    _focusNode.dispose();
    super.dispose();
  }

  void _onKeyPressed(String value) {
    setState(() {
      if (value == "x") {
        // Remove the last character if the text is not empty
        if (fuelLitersController.text.isNotEmpty) {
          fuelLitersController.text = fuelLitersController.text
              .substring(0, fuelLitersController.text.length - 1);
        }
      } else if (value == ".") {
        // Add decimal only if it doesn't already exist
        if (!fuelLitersController.text.contains(".")) {
          fuelLitersController.text += value;
        }
      } else {
        // Append the pressed key to the text
        fuelLitersController.text += value;
      }
    });
  }

  // Function to calculate the remaining fuel after pumping
  int calculateRemainingFuel() {
    double pumpedFuel = double.tryParse(fuelLitersController.text) ?? 0;
    return (widget.remainFuel - pumpedFuel).toInt();
  }

  // Function to update the fuel data via HTTP
  Future<void> updateFuelData(int customerFuelQuotaId, int newRemainFuel) async {
         print(customerFuelQuotaId.toString()+" "+newRemainFuel.toString());
    final url = Uri.parse('http://192.168.1.173:8080/api/v1/updateCustomerFueeldata/$customerFuelQuotaId/$newRemainFuel');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      // Parse the response body
      final result = json.decode(response.body);
   
      if (result.toString() == '1') {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Fuel data updated successfully.')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to update fuel data.')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error occurred while updating fuel data.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    print(widget.customerFuelQuotaId.toString()+" yyyy "+widget.remainFuel.toString());
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
            // Fuel Liters Input Box
            Container(
              padding: const EdgeInsets.all(30.0),
              decoration: BoxDecoration(
                color:
                    const Color.fromARGB(255, 255, 255, 255).withOpacity(0.2),
                borderRadius: BorderRadius.circular(8.0),
                border: Border.all(color: Colors.blue, width: 2.0),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Enter Pumped Fuel Liters',
                    style:
                        TextStyle(fontSize: 18.0, fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 30.0),
                  // Display the entered fuel liters
                  TextField(
                    controller: fuelLitersController,
                    keyboardType:
                        TextInputType.none, // Disable default keyboard
                    focusNode: _focusNode,
                    readOnly: true, // Prevent editing via default keyboard
                    decoration: const InputDecoration(
                      hintText: 'Enter fuel liters',
                      border: OutlineInputBorder(),
                      contentPadding:
                          EdgeInsets.symmetric(vertical: 16, horizontal: 20),
                    ),
                    onTap: () {
                      // Show the custom keyboard when tapped
                      FocusScope.of(context).requestFocus(_focusNode);
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20.0),
            if (_focusNode.hasFocus) _buildCustomKeyboard(),
            const SizedBox(height: 20.0),
            // Submit Button
            ElevatedButton(
              onPressed: () {
                if (fuelLitersController.text.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                        content: Text('Please fill in the fuel liters.')),
                  );
                } else {
                  // Calculate remaining fuel
                  int newRemainFuel = calculateRemainingFuel();
                  // Update fuel data via HTTP
                  updateFuelData(widget.customerFuelQuotaId, newRemainFuel);
                }
              },
              style: ElevatedButton.styleFrom(
                padding:
                    const EdgeInsets.symmetric(horizontal: 80, vertical: 12),
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
    final List<String> keys = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      ".",
      "0",
      "x",
    ];

    return Container(
      color: Colors.grey[200],
      padding: const EdgeInsets.all(8.0),
      child: GridView.builder(
        shrinkWrap: true,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3, // 3 columns for the keyboard
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
