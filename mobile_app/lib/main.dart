import 'package:flutter/material.dart';
import 'login.dart';
import 'ownerregister.dart';
import 'mainpage.dart';
import 'firstpage.dart';

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
      home: FirstScreen(),
      routes: {
        '/mainpage': (context) => MainScreen(),
        '/login': (context) => LoginScreen(),
        '/ownerregister': (context) => OwnerRegisterScreen(),
      
      },
      

      
      
    );
  }
}