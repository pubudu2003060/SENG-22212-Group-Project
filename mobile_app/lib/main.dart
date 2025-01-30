import 'package:flutter/material.dart';
import 'login.dart';
import 'ownerregister.dart';
import 'mainpage.dart';
import 'firstpage.dart';
import 'qr_scanner.dart';
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
       home: FirstScreen(),
       routes: {
         '/mainpage': (context) => MainScreen(),
         '/login': (context) => LoginScreen(),
         '/ownerregister': (context) => OwnerRegisterScreen(),
         '/qr_scanner': (context) => QRScannerScreen(),
         '/qr_details':(context) => DetailsScreen(vehicleNumber: ''),
         '/station_registration' : (context) => StationRegisterScreen(stationOwnerId:-1,),
         '/pumpping_fuel_quata' : (context) => PumpingFuelQuota(),
    
       },  

      
      
    );
  }
}