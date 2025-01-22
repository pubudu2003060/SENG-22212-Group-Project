import 'package:flutter/material.dart';

class OwnerRegisterScreen extends StatelessWidget {
  final TextEditingController nameController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController phoneNoController = TextEditingController();
  final TextEditingController nicController = TextEditingController();

  final _formKey = GlobalKey<FormState>();

  OwnerRegisterScreen({super.key});

  String? _validateName(String? value) {
    if (value == null || value.isEmpty) {
      return 'Owner name is required';
    }
    if (!RegExp(r'^[a-zA-Z\s]+$').hasMatch(value)) {
      return 'Owner name must contain only letters';
    }
    return null;
  }

  String? _validateAddress(String? value) {
    if (value == null || value.isEmpty) {
      return 'Address is required';
    }
    return null;
  }

  String? _validateNIC(String? value) {
    if (value == null || value.isEmpty) {
      return 'NIC is required';
    }
    if (!RegExp(r'^\d{12}$').hasMatch(value)) {
      return 'NIC must be a 12-digit number';
    }
    return null;
  }
  String? _validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return 'Phone number is required';
    }
    if (!RegExp(r'^\d{10}$').hasMatch(value)) {
      return 'Phone number must be 10 digits';
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Owner Registration'),
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
                controller: nameController,
                decoration: const InputDecoration(
                  labelText: 'Name',
                  border: OutlineInputBorder(),
                ),
                validator: _validateName,
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
              TextFormField(
                controller: nicController,
                decoration: const InputDecoration(
                  labelText: 'NIC',
                  border: OutlineInputBorder(),
                ),
                validator: _validateNIC,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                controller: phoneNoController,
                decoration: const InputDecoration(
                  labelText: 'Phone Number',
                  border: OutlineInputBorder(),
                ),
                validator: _validatePhone,
              ),
              const SizedBox(height: 60.0),
              
              ElevatedButton(
                onPressed: () {
                  /*if (_formKey.currentState!.validate()) {                    
                    Navigator.pushNamed(context, '/vehicle_registration');
                  }*/
                  Navigator.pushNamed(context, '/vehicle_registration');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(255, 64, 146, 198),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 40, vertical: 12),
                ),
                child: const Text(
                  'Submit',
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



