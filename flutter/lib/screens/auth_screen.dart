import 'package:flutter/material.dart';

class AuthScreen extends StatelessWidget {
  static const route = '/auth';

  const AuthScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          child: Text('auth'),
        ),
      ),
    );
  }
}
