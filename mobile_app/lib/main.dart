import 'package:flutter/material.dart';
import 'login.dart';
import 'register.dart';
import 'mainpage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fuel Station App',
      debugShowCheckedModeBanner: false, 
      home: MainScreen(),
      routes: {
        '/login': (context) => LoginScreen(),
        '/register': (context) => RegisterScreen(),
      },

      
      
    );
  }
}