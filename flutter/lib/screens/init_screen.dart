import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

import 'auth_screen.dart';
import 'item_list_screen.dart';

class InitScreen extends StatefulWidget {
  static const route = '/loading';

  const InitScreen({Key? key}) : super(key: key);

  @override
  _InitScreenState createState() => _InitScreenState();
}

class _InitScreenState extends State<InitScreen> {
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
          return wrapper(
            SpinKitPulse(
              color: Theme.of(context).primaryColor,
              size: 50.0,
            ),
          );
        }

        if (FirebaseAuth.instance.currentUser == null) {
          return AuthScreen();
        }

        return ItemListScreen();
      },
    );
  }
}
