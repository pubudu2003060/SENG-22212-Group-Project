import 'package:flutter/material.dart';


class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Profile"),
        backgroundColor: const Color.fromARGB(255, 80, 171, 227),
      ),
      body: SingleChildScrollView(  
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildFormField("Owner ID:", "12345"),
            _buildFormField("Registered ID:", "987654"),
            _buildFormField("Location:", "123, Main Street, Colombo"),
            _buildFormField("Status:", "ACTIVE"),
            _buildFormField("Station Type:", "Petrol Station"),
            _buildFormField("Eligible Fuel Capacity:", "10000 Liters"),
            _buildFormField("Capacity:", "8000 Liters"),
            _buildFormField("Fuel Type:", "Petrol"),
          ],
        ),
      ),
    );
  }

  Widget _buildFormField(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 7),
          TextFormField(
            initialValue: value,
            readOnly: true,
            decoration: InputDecoration(
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
              filled: true,
              fillColor: const Color.fromARGB(255, 225, 225, 225),
              contentPadding: const EdgeInsets.symmetric(horizontal: 11, vertical: 11),
            ),
          ),
          const SizedBox(height: 7),
          
            
        ],
      ),
    );
  }
}
