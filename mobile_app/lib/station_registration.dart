import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class StationRegisterScreen extends StatefulWidget {
  static const routeName = '/station_registration';
  
  const StationRegisterScreen({super.key, required int stationOwnerId});

  @override
  _StationRegisterScreenState createState() => _StationRegisterScreenState();
}

class _StationRegisterScreenState extends State<StationRegisterScreen> {
  final TextEditingController regNoController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController capacityController = TextEditingController();
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
    if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
      return 'Registration number must be numeric';
    }
    return null;
  }

  String? _validateAddress(String? value) {
    if (value == null || value.isEmpty) {
      return 'Address is required';
    }
    return null;
  }

  String? _validateCapacity(String? value) {
    if (value == null || value.isEmpty) {
      return 'Capacity is required';
    }
    if (!RegExp(r'^[0-9]+$').hasMatch(value)) {
      return 'Capacity must be numeric';
    }
    return null;
  }

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

  Future<void> _submitForm(BuildContext context, int ownerId) async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    final url = Uri.parse('http://192.168.1.173:8080/api/v1/addfuelstation');

    final body = json.encode({
      'location': addressController.text,
      'status': 'ACTIVE', 
      'stationType': selectedStationType,
      'registeredId': int.parse(regNoController.text),
      'eligibleFuelCapacity': selectedCapacity,
      'capacity': capacityController.text,
      'fuelType': selectedFuelType,
      'password': passwordController.text,
      'fuelStationOwner': {'stationOwnerid': ownerId}
    });

    try {
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: body,
      );

      print('Response status: ${response.statusCode}');
      print('Response body: ${response.body}');

      if (response.statusCode == 200) {
        Navigator.pushNamed(context, '/qr_scanner');
      } else {
        throw Exception('Failed to register fuel station: ${response.body}');
      }
    } catch (error) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $error')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final ownerId = ModalRoute.of(context)!.settings.arguments as int;
    
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
                keyboardType: TextInputType.number,
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
                  labelText: 'Eligible Fuel Station Capacity',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(
                      value: 'SMALL_5000_10000',
                      child: Text('Small (5,000L - 10,000L)')),
                  DropdownMenuItem(
                      value: 'MEDIUM_10000_15000',
                      child: Text('Medium (10,000L - 15,000L)')),
                  DropdownMenuItem(
                      value: 'LARGE_15000_20000',
                      child: Text('Large (15,000L - 20,000L)')),
                  DropdownMenuItem(
                      value: 'LARGE_20000_40000',
                      child: Text('Large (20,000L - 40,000L)'))
                ],
                onChanged: (value) => setState(() => selectedCapacity = value),
                validator: (value) =>
                    value == null ? 'Please select a capacity' : null,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                controller: capacityController,
                decoration: const InputDecoration(
                  labelText: 'Current Capacity',
                  border: OutlineInputBorder(),
                ),
                validator: _validateCapacity,
              ),
              const SizedBox(height: 20.0),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Fuel Type',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'DIESEL', child: Text('Diesel')),
                  DropdownMenuItem(value: 'PETROL', child: Text('Petrol')),
                  DropdownMenuItem(value: 'BOTH', child: Text('Both')),
                ],
                onChanged: (value) => setState(() => selectedFuelType = value),
                validator: (value) =>
                    value == null ? 'Please select a fuel type' : null,
              ),
              const SizedBox(height: 20.0),
              DropdownButtonFormField<String>(
                decoration: const InputDecoration(
                  labelText: 'Fuel Station Type',
                  border: OutlineInputBorder(),
                ),
                items: const [
                  DropdownMenuItem(value: 'IOC', child: Text('IOC')),
                  DropdownMenuItem(value: 'CEYPETCO', child: Text('Cypetco')),
                  DropdownMenuItem(value: 'CEYNOPEC', child: Text('Cynopec')),
                  DropdownMenuItem(value: 'OTHER', child: Text('Other')),
                ],
                onChanged: (value) => setState(() => selectedStationType = value),
                validator: (value) =>
                    value == null ? 'Please select a station type' : null,
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
                onPressed: () => _submitForm(context, ownerId),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                ),
                child: const Text('Register',
                    style: TextStyle(color: Colors.white)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}