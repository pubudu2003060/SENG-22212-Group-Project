import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; 

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
  
    if (!RegExp(r'^\d{9}$').hasMatch(value)) {
      return 'NIC must be exactly 9 digits';
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

  
  Future<void> _submitForm(BuildContext context) async {
    final String name = nameController.text;
    final String address = addressController.text;
    final String phoneNo = phoneNoController.text;
    final String nic = nicController.text;

    
    final url = Uri.parse(
        'http://10.0.2.2:8080/api/v1/addfuelstationowner'); 

   
    final body = json.encode({
      'name': name,
      'contact': phoneNo, 
      'address': address, 
      'nicNo': nic, 
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
       
        Navigator.pushNamed(context, '/station_registration');
      } else {
      
        throw Exception('Failed to register owner: ${response.body}');
      }
    } catch (error) {
      print('Error: $error');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $error')),
      );
    }
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
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                controller: phoneNoController,
                decoration: const InputDecoration(
                  labelText: 'Phone Number',
                  border: OutlineInputBorder(),
                ),
                validator: _validatePhone,
                keyboardType: TextInputType.phone,
              ),
              const SizedBox(height: 60.0),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                   
                    _submitForm(context);
                  }
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
