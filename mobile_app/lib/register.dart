import 'package:flutter/material.dart';

class RegisterScreen extends StatelessWidget {
  final TextEditingController regNoController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneNoController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();

  final _formKey = GlobalKey<FormState>();

  RegisterScreen({super.key});

  String? _validateRegNo(String? value) {
    if (value == null || value.isEmpty) {
      return 'Registration number is required';
    }
    if (!RegExp(r'^\d{8}$').hasMatch(value)) {
      return 'Registration number must be 8 digits';
    }
    return null;
  }

  String? _validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Email is required';
    }
    if (!RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$').hasMatch(value)) {
      return 'Enter a valid email';
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

  String? _validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Password is required';
    }
    if (value.length < 8 ||
        !RegExp(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)').hasMatch(value)) {
      return 'Password must be at least 8 characters long and include a mix of uppercase, lowercase, and numbers';
    }
    return null;
  }

  String? _validateConfirmPassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Please confirm your password';
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
        title: const Text('Register'),
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
                  labelText: 'Registration No',
                  border: OutlineInputBorder(),
                ),
                validator: _validateRegNo,
              ),
              const SizedBox(height: 20.0),
              TextFormField(
                controller: emailController,
                decoration: const InputDecoration(
                  labelText: 'Email Address',
                  border: OutlineInputBorder(),
                ),
                validator: _validateEmail,
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
              const SizedBox(height: 50.0),
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
                  if (_formKey.currentState!.validate()) {                    
                    Navigator.pushNamed(context, '/login');
                  }
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
