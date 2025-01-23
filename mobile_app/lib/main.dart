import 'package:flutter/material.dart';
import 'login.dart';
import 'ownerregister.dart';
import 'mainpage.dart';
import 'qr_details.dart';
import 'station_registration.dart';
import 'pumpping_fuel_quata.dart';

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
        '/ownerregister': (context) => OwnerRegisterScreen(),
        '/qr_details':(context) => DetailsScreen(),
        '/vehicle_registration' : (context) => StationRegisterScreen(),
        '/pumpping_fuel_quata' : (context) => PumpingFuelQuota(),
    
      },
      

      
      
    );
  }
}