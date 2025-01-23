import 'package:flutter/material.dart';

class StationRegisterScreen extends StatelessWidget {
  final TextEditingController regNoController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  final _formKey = GlobalKey<FormState>();
  String? selectedCapacity;
  String? selectedFuelType;
  String? selectedStationType;

  StationRegisterScreen({super.key});

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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Station Registration'),
        backgroundColor: const Color.fromARGB(255, 80, 171, 227),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.only(
            top: 70.0, bottom: 16.0, left: 16.0, right: 16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
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
                  DropdownMenuItem(value: 'small', child: Text('Small (5000L - 15,000L)')),
                  DropdownMenuItem(value: 'medium', child: Text('Medium (15,000L - 40,000L)')),
                  DropdownMenuItem(value: 'large', child: Text('Large (40,000L - 100,000L)')),
                ],
                onChanged: (value) {
                  selectedCapacity = value;
                },
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
                ],
                onChanged: (value) {
                  selectedFuelType = value;
                },
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
                onChanged: (value) {
                  selectedStationType = value;
                },
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
              const SizedBox(height: 60.0),
              ElevatedButton(
                onPressed: () {
                  /*if (_formKey.currentState!.validate()) {
                    Navigator.pushNamed(context, '/success');
                  }*/
                  Navigator.pushNamed(context, '/qr_details');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(255, 64, 146, 198),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                ),
                child: const Text(
                  'Register',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 15.0,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}