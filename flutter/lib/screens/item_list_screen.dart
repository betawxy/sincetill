import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/screens/add_item_screen.dart';
import 'package:sincetill/screens/auth_screen.dart';
import 'package:sincetill/screens/search_screen.dart';
import 'package:sincetill/store/item_store.dart';
import 'package:sincetill/widgets/appbar_title.dart';
import 'package:sincetill/widgets/item_list_tile.dart';
import 'package:sincetill/widgets/menu_button.dart';

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
      appBar: AppBar(
        leading: null,
        automaticallyImplyLeading: false,
        title: AppBarTitle(),
      ),
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
                        return ItemListTile(item: item);
                      },
                    );
                  }
                  if (snapshot.hasError) {
                    return Center(
                      child: Text('Something went wrong.'),
                    );
                  }
                  return Center(
                    child: SpinKitPulse(
                      color: Colors.blue,
                      size: 50.0,
                      duration: Duration(milliseconds: 500),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(
          Icons.add,
        ),
        onPressed: () {
          Navigator.pushNamed(context, AddItemScreen.route);
        },
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.endDocked,
      bottomNavigationBar: BottomAppBar(
        shape: const CircularNotchedRectangle(),
        color: Theme.of(context).primaryColor,
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 4.0),
            child: Row(
              children: [
                MenuButton(),
                IconButton(
                  tooltip:
                      MaterialLocalizations.of(context).selectAllButtonLabel,
                  icon: const Icon(
                    Icons.search,
                    color: Colors.white,
                  ),
                  onPressed: () async {
                    var items = await ItemStore(user.uid).allItems();
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => SearchScreen(items: items),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
