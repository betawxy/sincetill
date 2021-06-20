import 'package:adaptive_dialog/adaptive_dialog.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart' as firebase_storage;
import 'package:flutter/material.dart';
import 'package:flutter_speed_dial/flutter_speed_dial.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/screens/edit_item_screen.dart';
import 'package:sincetill/store/item_store.dart';
import 'package:sincetill/widgets/appbar_title.dart';
import 'package:sincetill/widgets/item_bg_image_wrapper.dart';
import 'package:sincetill/widgets/item_details_card.dart';

class ItemDetailsScreen extends StatelessWidget {
  static const route = '/item';

  const ItemDetailsScreen({
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
          child: ItemBackgroundImageWrapper(
            item: item,
            child: ItemDetailsCard(item: item),
          ),
        ),
      ),
      floatingActionButton: SpeedDial(
        icon: Icons.menu,
        activeIcon: Icons.close,
        backgroundColor: Theme.of(context).accentColor,
        foregroundColor: Colors.white,
        children: [
          SpeedDialChild(
            child: Icon(Icons.delete),
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
            label: 'Delete',
            labelStyle: TextStyle(fontSize: 16.0),
            onTap: () async {
              var res = await showOkCancelAlertDialog(
                context: context,
                title: 'Delete "${item.title}"?',
                isDestructiveAction: true,
              );
              if (res == OkCancelResult.ok && user != null) {
                try {
                  await storage
                      .ref('images')
                      .child(user.uid)
                      .child('${item.id}_${item.title}.jpg')
                      .delete();
                } catch (e) {}
                try {
                  await ItemStore(user.uid).delete(item);
                  Navigator.pop(context);
                } catch (e) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(
                        'Failed to delete item.',
                      ),
                    ),
                  );
                }
              }
            },
          ),
          SpeedDialChild(
            child: Icon(Icons.edit),
            backgroundColor: Theme.of(context).primaryColor,
            foregroundColor: Colors.white,
            label: 'Edit',
            labelStyle: TextStyle(fontSize: 16.0),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => EditItemScreen(item: item),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
