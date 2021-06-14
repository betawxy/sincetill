import 'package:flutter/material.dart';
import 'package:sincetill/screens/auth_screen.dart';
import 'package:sincetill/screens/item_details_screen.dart';
import 'package:sincetill/screens/item_list_screen.dart';
import 'package:sincetill/screens/loading_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      initialRoute: LoadingScreen.route,
      routes: {
        LoadingScreen.route: (context) => LoadingScreen(),
        AuthScreen.route: (context) => AuthScreen(),
        ItemListScreen.route: (context) => ItemListScreen(),
        ItemDetailsScreen.route: (context) => ItemDetailsScreen(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
