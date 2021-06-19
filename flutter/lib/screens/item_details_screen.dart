import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';
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
    );
  }
}
