import 'package:flutter/material.dart';

class DetailsScreen extends StatefulWidget {
  DetailsScreen({super.key});

  @override
  _DetailsScreenState createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  final TextEditingController fuelQuotaController = TextEditingController();
  final TextEditingController eligibleDatesController = TextEditingController();
  final TextEditingController vehicleNumberController = TextEditingController();
  final TextEditingController vehicleTypeController = TextEditingController();

  bool isEligible = false; 

  @override
  void initState() {
    super.initState();
    _fetchDataFromBackend();
  }

 
  void _fetchDataFromBackend() {
    setState(() {
      fuelQuotaController.text = '10'; 
      eligibleDatesController.text = '2025-01-22'; 
      vehicleNumberController.text = 'AB-1234';
      vehicleTypeController.text = 'Car'; 
      _checkEligibility();
    });
  }

 
  void _checkEligibility() {
    final fuelQuota = int.tryParse(fuelQuotaController.text) ?? 0;
    final eligibleDate = DateTime.tryParse(eligibleDatesController.text);
    final today = DateTime.now();

    setState(() {
      isEligible = fuelQuota > 0 && (eligibleDate != null && eligibleDate.isBefore(today));
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Details'),
        backgroundColor: const Color.fromARGB(255, 80, 171, 227),
      ),
      body: Padding(
         padding: const EdgeInsets.only(
             top: 70.0, bottom: 16.0, left: 16.0, right: 16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
           
            Row(
              children: [
             
                Expanded(
                  child: _buildColoredBox('Remain Fuel Quota', fuelQuotaController.text, isEligible ? Colors.green : Colors.red),
                ),

                SizedBox(width: 30.0), 

               
                Expanded(
                  child: _buildColoredBox('Eligible Dates', eligibleDatesController.text, isEligible ? Colors.green : Colors.red),
                ),
              ],
            ),
            SizedBox(height: 30.0), 

          
            TextField(
              controller: vehicleNumberController,
              decoration: InputDecoration(
                labelText: 'Vehicle Number',
                labelStyle: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w500),
                border: OutlineInputBorder(),
                contentPadding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              ),
              readOnly: true,
            ),
            SizedBox(height: 30.0),

            
            TextField(
              controller: vehicleTypeController,
              decoration: InputDecoration(
                labelText: 'Vehicle Type',
                labelStyle: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w500),
                border: OutlineInputBorder(),
                contentPadding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
              ),
              readOnly: true,
            ),
            Spacer(),

           
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
             
                ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    padding: EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                  ),
                  child: Text(
                    'Cancel',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15.0,
                    ),
                  ),
                ),

               
                ElevatedButton(
                  onPressed: () {
                    final fuelQuota = int.tryParse(fuelQuotaController.text) ?? 0;

                    if (fuelQuota == 0) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Fuel quota is 0. Cannot proceed.'),
                        ),
                      );
                    } else {
                      Navigator.pushNamed(context, '/nextPage'); // Navigate to the next page
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 64, 146, 198),
                    padding: EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                  ),
                  child: Text(
                    'Confirm',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15.0,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }


  Widget _buildColoredBox(String label, String value, Color color) {
    return Container(
      padding: EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2), 
        borderRadius: BorderRadius.circular(8.0),
        border: Border.all(color: color, width: 2.0),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            label,
            style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.w600),
          ),
          SizedBox(height: 8.0),
          Text(
            value,
            style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w500),
          ),
        ],
      ),
    );
  }
}
