import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/widgets/item_list_tile.dart';

import 'auth_screen.dart';

class SearchScreen extends StatefulWidget {
  static const route = '/search';

  const SearchScreen({Key? key, required this.items}) : super(key: key);
  final List<Item> items;

  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  String pattern = '';
  List<Item> filteredItems = [];

  @override
  Widget build(BuildContext context) {
    final User? user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return AuthScreen();
    }

    return Scaffold(
      appBar: AppBar(
        title: TextField(
          autofocus: true,
          decoration: InputDecoration(
            hintText: 'Search items...',
            isDense: true,
            filled: true,
            fillColor: Colors.white,
            border: InputBorder.none,
          ),
          onChanged: (value) {
            setState(() {
              pattern = value;
              filteredItems = filterItems(widget.items, pattern);
            });
          },
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: ListView(
                children: filteredItems
                    .map(
                      (item) => ItemListTile(item: item),
                    )
                    .toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

List<Item> filterItems(List<Item> items, String pattern) {
  if (pattern.isEmpty) return [];

  return items;
}
