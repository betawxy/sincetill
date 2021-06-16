import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/widgets/appbar_title.dart';

import '../constants.dart';

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
      body: CachedNetworkImage(
        imageUrl: item.backgroundImage.isEmpty
            ? kDefaultImageUrl
            : item.backgroundImage,
        imageBuilder: (context, imageProvider) => Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: imageProvider,
              fit: BoxFit.cover,
            ),
          ),
          child: Container(
            width: double.infinity,
            height: double.infinity,
            child: Center(
              child: Text(item.title),
            ),
          ),
        ),
      ),
    );
  }
}
