import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:sincetill/screens/auth_screen.dart';
import 'package:sincetill/screens/item_details_screen.dart';

class LoadingScreen extends StatefulWidget {
  static const route = '/loading';

  const LoadingScreen({Key? key}) : super(key: key);

  @override
  _LoadingScreenState createState() => _LoadingScreenState();
}

class _LoadingScreenState extends State<LoadingScreen> {
  final Future<FirebaseApp> _initialization = Firebase.initializeApp();

  Widget wrapper(Widget child) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: child,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: _initialization,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return wrapper(Text('something went wrong.'));
        }

        if (snapshot.connectionState != ConnectionState.done) {
          return wrapper(Text('loading...'));
        }

        if (FirebaseAuth.instance.currentUser == null) {
          return AuthScreen();
        }

        return ItemDetailsScreen();
      },
    );
  }
}
