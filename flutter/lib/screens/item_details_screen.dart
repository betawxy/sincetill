import 'package:flutter/material.dart';

class ItemDetailsScreen extends StatelessWidget {
  static const route = '/item';

  const ItemDetailsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          child: Text('item details'),
        ),
      ),
    );
  }
}
