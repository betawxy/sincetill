import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/widgets/appbar_title.dart';

class ItemEditScreen extends StatelessWidget {
  static const route = '/edit';

  const ItemEditScreen({
    Key? key,
    required this.item,
  }) : super(key: key);
  final Item item;

  @override
  Widget build(BuildContext context) {
    final User? user = FirebaseAuth.instance.currentUser;

    firebase_storage.FirebaseStorage storage =
        firebase_storage.FirebaseStorage.instance;

    return Scaffold(
      appBar: AppBar(
        title: AppBarTitle(),
      ),
      body: Hero(
        tag: 'hero-${item.id}',
        child: Material(
          child: Text('edit'),
        ),
      ),
    );
  }
}
