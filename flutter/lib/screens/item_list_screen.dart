import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class ItemListScreen extends StatelessWidget {
  static const route = '/items';

  const ItemListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final User? user = FirebaseAuth.instance.currentUser;

    return Scaffold(
      body: SafeArea(
        child: Container(
          child: Text(user?.displayName ?? 'Unknown user name'),
        ),
      ),
    );
  }
}
