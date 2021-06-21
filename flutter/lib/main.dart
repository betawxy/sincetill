import 'package:flutter/material.dart';
import 'package:sincetill/screens/add_item_screen.dart';
import 'package:sincetill/screens/auth_screen.dart';
import 'package:sincetill/screens/init_screen.dart';
import 'package:sincetill/screens/item_list_screen.dart';

import 'constants.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: InitScreen.route,
      routes: {
        InitScreen.route: (context) => InitScreen(),
        AuthScreen.route: (context) => AuthScreen(),
        ItemListScreen.route: (context) => ItemListScreen(),
        AddItemScreen.route: (context) => AddItemScreen(),
      },
      debugShowCheckedModeBanner: false,
      theme: kAppTheme,
    );
  }
}
