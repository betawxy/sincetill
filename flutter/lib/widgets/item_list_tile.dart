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
        ListTile(
          leading: Container(
            width: 60,
            height: 60,
            child: ClipRRect(
              child: Image(
                image: NetworkImage(item.backgroundImage),
                fit: BoxFit.cover,
              ),
              borderRadius: BorderRadius.circular(5),
            ),
          ),
          title: Row(
            children: [
              Chip(
                label: Text(
                  'since',
                  style: TextStyle(fontSize: 12),
                ),
                labelPadding: EdgeInsets.zero,
              ),
              Text(
                item.title,
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
          subtitle: Text(
            item.ts.toDate().toString(),
          ),
        ),
        Divider(
          height: 1,
        ),
      ],
    );
  }
}
