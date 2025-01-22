import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  final TextEditingController regNoController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
        backgroundColor: const Color.fromARGB(255, 80, 171, 227),
      ),

      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: regNoController,
              decoration: InputDecoration(
                labelText: 'Registration No',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 16.0),

            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(
                labelText: 'Password',
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 60.0),

            ElevatedButton(
              onPressed: () {
                final regNo = regNoController.text;
                final password = passwordController.text;

                if (regNo.isEmpty || password.isEmpty) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Please fill all fields')),
                  );
                } else {                  
                  Navigator.pushNamed(context, '/dashboard');
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Color.fromARGB(255, 64, 146, 198), 
                padding: EdgeInsets.symmetric(horizontal: 40, vertical: 12),
              ),
              child: Text('Login'),
            ),

            SizedBox(height: 16.0),
            
            TextButton(
              onPressed: () {
                Navigator.pushNamed(context, '/register');
              },
              child: const Text('Register'),
            ),
          ],
        ),
      ),
    );
  }
}
