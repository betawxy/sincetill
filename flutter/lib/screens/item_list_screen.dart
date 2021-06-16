import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/screens/add_item_screen.dart';
import 'package:sincetill/screens/auth_screen.dart';
import 'package:sincetill/store/item_store.dart';
import 'package:sincetill/widgets/appbar_title.dart';
import 'package:sincetill/widgets/item_list_tile.dart';

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
                IconButton(
                  tooltip:
                      MaterialLocalizations.of(context).openAppDrawerTooltip,
                  icon: const Icon(
                    Icons.menu,
                    color: Colors.white,
                  ),
                  onPressed: () {
                    showModalBottomSheet(
                      context: context,
                      backgroundColor: Theme.of(context).primaryColor,
                      builder: (context) => Container(
                        height: MediaQuery.of(context).size.height * .3,
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            TextButton(
                              onPressed: () async {
                                await FirebaseAuth.instance.signOut();
                                Navigator.pushReplacementNamed(
                                  context,
                                  AuthScreen.route,
                                );
                              },
                              child: Text('Sign Out'),
                              style: ButtonStyle(
                                foregroundColor: MaterialStateProperty.all(
                                  Color(0xffedf6f9),
                                ),
                              ),
                            )
                          ],
                        ),
                      ),
                    );
                  },
                ),
                IconButton(
                  tooltip:
                      MaterialLocalizations.of(context).selectAllButtonLabel,
                  icon: const Icon(
                    Icons.search,
                    color: Colors.white,
                  ),
                  onPressed: () {},
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
