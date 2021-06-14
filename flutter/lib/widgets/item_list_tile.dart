import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';

class ItemListTile extends StatelessWidget {
  const ItemListTile({
    Key? key,
    required this.item,
  }) : super(key: key);

  final Item item;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Divider(),
        ListTile(
          // tileColor: Color.fromARGB(0xff, 243, 244, 245),
          leading: Container(
            width: 60,
            height: 60,
            child: Image(
              image: NetworkImage(item.backgroundImage),
              fit: BoxFit.cover,
            ),
          ),
          title: Text(item.title),
          subtitle: Text(
            item.ts.toDate().toString(),
          ),
        ),
      ],
    );
  }
}
