import 'package:flutter/material.dart';

class SearchScreen extends StatefulWidget {
  static const route = '/search';

  const SearchScreen({Key? key}) : super(key: key);

  @override
  _SearchScreenState createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  @override
  Widget build(BuildContext context) {
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
        ),
      ),
    );
  }
}
