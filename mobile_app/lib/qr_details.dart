import 'package:flutter/material.dart';
import 'package:mobile_app/pumpping_fuel_quata.dart';
import 'package:shared_preferences/shared_preferences.dart';

class DetailsScreen extends StatefulWidget {
  final String firstName;
  final String lastName;
  final String idNo;
  final String vehicalType;
  final String vehicalNo;
  final String fualType;
  final String eligibleDays;
  final int eligibleFuelQuota;
  final int remainFuel;
  final int customerFuelQuotaId;

  const DetailsScreen({
    Key? key,
    required this.firstName,
    required this.lastName,
    required this.idNo,
    required this.vehicalType,
    required this.vehicalNo,
    required this.fualType,
    required this.eligibleDays,
    required this.eligibleFuelQuota,
    required this.remainFuel,
    required this.customerFuelQuotaId,
  }) : super(key: key);

  @override
  _DetailsScreenState createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen> {
  bool isEligible = false;

  @override
  void initState() {
    super.initState();
    _checkEligibility();
  }

  void _checkEligibility() {
    setState(() {
      isEligible = widget.remainFuel > 0;
    });
  }

  Future<void> saveData() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('fuelType', widget.fualType);
  }

  @override
  Widget build(BuildContext context) {
    
    saveData();
    print(widget.customerFuelQuotaId.toString() +
        "rrr " +
        widget.remainFuel.toString());
    return Scaffold(
      appBar: AppBar(
        title: const Text('Details'),
        automaticallyImplyLeading: false,
        backgroundColor: const Color.fromARGB(255, 80, 171, 227),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: _buildColoredBox(
                      'Remain Fuel Quota',
                      '${widget.remainFuel}',
                      isEligible ? Colors.green : Colors.red),
                ),
                SizedBox(width: 30.0),
                Expanded(
                  child: _buildColoredBox(
                      'Eligible Days', widget.eligibleDays, Colors.blue),
                ),
              ],
            ),
            SizedBox(height: 20.0),
            _buildInfoTile('First Name', widget.firstName),
            _buildInfoTile('Last Name', widget.lastName),
            _buildInfoTile('ID No', widget.idNo),
            _buildInfoTile('Vehicle Number', widget.vehicalNo),
            _buildInfoTile('Vehicle Type', widget.vehicalType),
            _buildInfoTile('Fuel Type', widget.fualType),
            _buildInfoTile(
                'Eligible Fuel Quota', '${widget.eligibleFuelQuota} L'),

            SizedBox(height: 120), // Add a smaller gap instead of Spacer

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () =>
                      Navigator.pushReplacementNamed(context, '/qr_scanner'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                    padding: EdgeInsets.symmetric(horizontal: 50, vertical: 20),
                  ),
                  child: Text(
                    'Cancel',
                    style: TextStyle(color: Colors.white, fontSize: 15.0),
                  ),
                ),
                ElevatedButton(
                  onPressed: isEligible
                      ? () {
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                              builder: (context) => PumpingFuelQuota(
                                  remainFuel: widget.remainFuel,
                                  customerFuelQuotaId:
                                      widget.customerFuelQuotaId),
                            ),
                          );
                        }
                      : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color.fromARGB(255, 64, 146, 198),
                    padding: EdgeInsets.symmetric(horizontal: 50, vertical: 20),
                  ),
                  child: Text(
                    'Confirm',
                    style: TextStyle(color: Colors.white, fontSize: 15.0),
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
          Text(label,
              style: TextStyle(fontSize: 14.0, fontWeight: FontWeight.w600)),
          SizedBox(height: 8.0),
          Text(value,
              style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Widget _buildInfoTile(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: TextField(
        readOnly: true,
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(),
          filled: true,
          fillColor: Colors.white,
          contentPadding: EdgeInsets.symmetric(vertical: 12, horizontal: 16),
        ),
        controller: TextEditingController(text: value),
      ),
    );
  }
}
