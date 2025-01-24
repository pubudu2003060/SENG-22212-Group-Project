import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  MainScreenState createState() => MainScreenState();
}

class MainScreenState extends State<MainScreen> {
  void _showPopup() {
    showDialog(
      context: context, 
      barrierDismissible: true, 
      builder: (BuildContext context) {
        return Dialog(
          backgroundColor: Colors.transparent, 
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10.0),
          ),
          child: Center(
            child: Container(
              width: 320,
              height: 543,
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                color: Color.fromARGB(230, 255, 255, 255),  // White background for the dialog
                borderRadius: BorderRadius.circular(10.0),  // Rounded corners
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const SizedBox(height: 10),
                  Image.asset(
                    'assets/images/logo.png',
                    width: 100,
                    height: 100,
                    fit: BoxFit.contain,
                  ),
                  const SizedBox(height: 50),
                  const Text(
                    'Welcome',
                    style: TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      color: Color.fromARGB(255, 18, 68, 109),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 15),
                  const Text(
                    'to',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Color.fromARGB(255, 18, 68, 109),
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 15),
                  ShaderMask(
                    shaderCallback: (bounds) {
                      return LinearGradient(
                        colors: [
                          const Color(0xFF135C8A),                     
                          const Color(0xFF4DA689),
                          const Color(0xFF135C8A),
                        ],
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                      ).createShader(Rect.fromLTRB(0, 0, bounds.width, bounds.height));
                    },
                    child: const Text(
                      'PassMyFuel',
                      style: TextStyle(
                        fontSize: 34,
                        fontWeight: FontWeight.bold,
                        color: Colors.white, 
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 50),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/login'); 
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(255, 64, 146, 198),
                      padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 8),
                    ),
                    child: const Text(
                      'Login',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                      ),
                    ),
                  ),
                  const SizedBox(height: 15),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/ownerregister'); 
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(255, 64, 146, 198),
                      padding: const EdgeInsets.symmetric(horizontal: 30, vertical: 8),
                    ),
                    child: const Text(
                      'Register',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge); 
    return Scaffold(
      body: Stack(
        children: [          
          Positioned.fill(
            child: Container(
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/images/bg.png'), 
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
          
          Positioned(
            bottom: 150,
            left: 22,
            right: null, 
            child: ElevatedButton(
              onPressed: _showPopup, 
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.transparent,
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                side: const BorderSide(width: 1, color: Colors.white),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min, 
                children: [
                  const Text(
                    'Get Started',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                    ),
                  ),
                  const SizedBox(width: 8), 
                  Transform.rotate(
                    angle: 3.14, 
                    child: Image.asset(
                      'assets/images/arrow.png', 
                      width: 22, 
                      height: 22,
                      fit: BoxFit.contain,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
