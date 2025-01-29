import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class StationRegisterScreen extends StatefulWidget {
  const StationRegisterScreen({super.key});
  @override
  _StationRegisterScreenState createState() => _StationRegisterScreenState();
}

class _StationRegisterScreenState extends State<StationRegisterScreen> {
  final TextEditingController regNoController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  String? selectedCapacity;
  String? selectedFuelType;
  String? selectedStationType;

  String? _validateRegNo(String? value) {
    if (value == null || value.isEmpty) {
      return 'Fuel station registration number is required';
    }
    if (!RegExp(r'^[a-zA-Z0-9]+$').hasMatch(value)) {
      return 'Registration number must be alphanumeric';
    }
    return null;
  }

  String? _validateAddress(String? value) {
    if (value == null || value.isEmpty) {
      return 'Address is required';
    }
    return null;
  }

  final List<String> fuelCapacityOptions = ['5000L', '10000L', '15000L'];

  final List<Map<String, String>> fuelTypeOptions = [
    {'value': 'petrol', 'label': 'Petrol'},
    {'value': 'diesel', 'label': 'Diesel'},
    {'value': 'both', 'label': 'Both'},
  ];

  final List<Map<String, String>> stationTypeOptions = [
    {'value': 'government', 'label': 'Government'},
    {'value': 'private', 'label': 'Private'},
  ];

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  }

  String? _validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Confirm password is required';
    }
    if (value != passwordController.text) {
      return 'Passwords do not match';
    }
    return null;
  }

  Future<void> _submitForm(BuildContext context) async {
    if (!_formKey.currentState!.validate()) {      
      return;
    }

    final url = Uri.parse('http://localhost:8080/api/v1/addfuelstation');

    final body = json.encode({
      'regNo': regNoController.text,
      'address': addressController.text,
      'capacity': selectedCapacity,
      'fuelType': selectedFuelType,
      'stationType': selectedStationType,
      'password': passwordController.text
    });

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      if (response.statusCode == 200) {
        Navigator.pushNamed(context, '/qr_scanner');
      } else {
        throw Exception('Failed to register owner: ${response.body}');
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $error')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Station Registration'),
        backgroundColor: const Color.fromARGB(255, 80, 171, 227),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: regNoController,
                decoration: const InputDecoration(
                  labelText: 'Fuel Station Registration Number',
                  border: OutlineInputBorder(),
                ),
                validator: _validateRegNo,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                controller: addressController,
                decoration: const InputDecoration(
                  labelText: 'Address',
                  border: OutlineInputBorder(),
                ),
                validator: _validateAddress,
              ),
              const SizedBox(height: 20.0),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Fuel Station Capacity',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'small', child: Text('Small (5,000L - 15,000L)')),
                  DropdownMenuItem(value: 'medium', child: Text('Medium (15,000L - 40,000L)')),
                  DropdownMenuItem(value: 'large', child: Text('Large (40,000L - 100,000L)')),
                ],
                onChanged: (value) => setState(() => selectedCapacity = value),
                validator: (value) => value == null ? 'Please select a capacity' : null,
              ),
              const SizedBox(height: 20.0),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Fuel Type',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'diesel', child: Text('Diesel')),
                  DropdownMenuItem(value: 'petrol', child: Text('Petrol')),
                  DropdownMenuItem(value: 'both', child: Text('Both')),
                ],
                onChanged: (value) => setState(() => selectedFuelType = value),
                validator: (value) => value == null ? 'Please select a fuel type' : null,
              ),
              const SizedBox(height: 20.0),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Fuel Station Type',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'cypetco', child: Text('Cypetco')),
                  DropdownMenuItem(value: 'ioc', child: Text('IOC')),
                  DropdownMenuItem(value: 'cynopec', child: Text('Cynopec')),
                  DropdownMenuItem(value: 'other', child: Text('Other')),
                ],
                onChanged: (value) => setState(() => selectedStationType = value),
                validator: (value) => value == null ? 'Please select a station type' : null,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                controller: passwordController,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(),
                ),
                validator: _validatePassword,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                controller: confirmPasswordController,
                obscureText: true,
                decoration: const InputDecoration(
                  labelText: 'Confirm Password',
                  border: OutlineInputBorder(),
                ),
                validator: _validateConfirmPassword,
              ),
              const SizedBox(height: 40.0),
              ElevatedButton(
                onPressed: () => _submitForm(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                ),
                child: const Text('Register', style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
