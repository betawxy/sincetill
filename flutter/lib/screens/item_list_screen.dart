import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/screens/auth_screen.dart';
import 'package:sincetill/store/item_store.dart';

class ItemListScreen extends StatelessWidget {
  static const route = '/items';

  const ItemListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final User? user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return AuthScreen();
    }

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: StreamBuilder<QuerySnapshot<Item>>(
                stream: ItemStore(user.uid).items,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    var docs = snapshot.data!.docs.reversed.toList();
                    return ListView.builder(
                      itemCount: docs.length,
                      itemBuilder: (context, index) {
                        Item item = docs[index].data();
                        return ListTile(
                          title: Text(item.title),
                        );
                      },
                    );
                  }
                  // todo error handling etc
                  return Center(
                    child: Text('loading...'),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
