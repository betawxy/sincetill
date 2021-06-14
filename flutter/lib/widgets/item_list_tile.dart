import 'package:cloud_firestore/cloud_firestore.dart';
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
    bool isSince = item.ts.compareTo(Timestamp.now()) < 0;
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
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    MyChip(
                      label: isSince ? 'since' : 'till',
                      color: isSince ? Color(0xFF0FB981) : Color(0xFFED57A1),
                    ),
                    SizedBox(
                      width: 5,
                    ),
                    Expanded(
                      child: Text(
                        item.title,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ),
              Visibility(
                child: MyChip(
                  label: 'full day',
                  color: Color(0xFFF6A217),
                ),
                visible: item.isFullDayEvent,
              )
            ],
          ),
          subtitle: Padding(
            padding: const EdgeInsets.only(top: 8.0),
            child: Text(
              item.getDateTimeString(),
            ),
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
  const MyChip({
    Key? key,
    required this.label,
    required this.color,
  }) : super(key: key);

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(
        label,
        style: TextStyle(
          fontSize: 12,
          color: color,
        ),
      ),
      padding: EdgeInsets.symmetric(horizontal: 5, vertical: 2),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(2),
      ),
    );
  }
}
