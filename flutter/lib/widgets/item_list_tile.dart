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
              MyChip(label: 'since'),
              SizedBox(
                width: 5,
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

class MyChip extends StatelessWidget {
  const MyChip({Key? key, required this.label}) : super(key: key);

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(
        label,
        style: TextStyle(fontSize: 12),
      ),
      padding: EdgeInsets.symmetric(horizontal: 5, vertical: 2),
      decoration: BoxDecoration(
        color: Colors.greenAccent.shade100,
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }
}
