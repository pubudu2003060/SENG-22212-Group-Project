import 'package:flutter/material.dart';
import 'login.dart';
import 'ownerregister.dart';
import 'mainpage.dart';
import 'firstpage.dart';
import 'qr_scanner.dart';
import 'qr_details.dart';
import 'station_registration.dart';
import 'pumpping_fuel_quata.dart';
import 'dashboard.dart';
import 'profile.dart';

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
        '/qr_details': (context) => DetailsScreen(
              firstName: '',
              lastName: '',
              idNo: '',
              vehicalType: '',
              vehicalNo: '',
              fualType: '',
              eligibleDays: '',
              eligibleFuelQuota: 0,
              remainFuel: 0,
              customerFuelQuotaId: 0,
            ),
        '/station_registration': (context) => StationRegisterScreen(
              stationOwnerId: -1,
            ),
        '/pumpping_fuel_quata': (context) => PumpingFuelQuota(
              remainFuel: 0,
              customerFuelQuotaId: 0,
            ),
        '/dashboard': (context) => DashboardPage(),
        '/profile': (context) => ProfilePage()
      },
    );
  }
}
