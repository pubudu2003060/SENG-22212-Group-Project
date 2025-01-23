import 'package:flutter/material.dart';

class FirstScreen extends StatelessWidget {
  const FirstScreen({super.key});

  @override
  Widget build(BuildContext context) {  
    Future.delayed(const Duration(seconds: 6), () {
      Navigator.pushReplacementNamed(context, '/mainpage');
    });

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [
              const Color.fromARGB(255, 46, 155, 245), 
              Colors.purple, 
            ],
            begin: Alignment.topLeft, 
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Image.asset(
            'assets/images/logo.png',
            width: 170,
            height: 170,
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }
}