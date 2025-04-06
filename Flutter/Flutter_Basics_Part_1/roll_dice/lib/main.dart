import 'package:flutter/material.dart';

import 'package:roll_dice/gradient_container.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Scaffold(
        appBar: AppBar(title: const Text('First App')),
        body: const GradientContainer(
          Color.fromARGB(255, 26, 2, 80),
          Color.fromARGB(255, 45, 7, 98),
        ),
      ),
    );
  }
}
