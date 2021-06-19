import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:sincetill/models/item_model.dart';

class ItemBackgroundImageWrapper extends StatelessWidget {
  const ItemBackgroundImageWrapper({
    Key? key,
    required this.item,
    required this.child,
  }) : super(key: key);

  final Item item;
  final Widget child;

  Container _container(BuildContext context, ImageProvider imageProvider) {
    return Container(
      decoration: BoxDecoration(
        image: DecorationImage(
          image: imageProvider,
          fit: BoxFit.cover,
        ),
      ),
      child: Container(
        width: MediaQuery.of(context).size.width,
        height: MediaQuery.of(context).size.height,
        child: child,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (item.backgroundImage.isEmpty) {
      return _container(
        context,
        AssetImage(
          'images/bg.jpeg',
        ),
      );
    }

    return CachedNetworkImage(
      imageUrl: item.backgroundImage,
      imageBuilder: (context, imageProvider) => _container(
        context,
        imageProvider,
      ),
    );
  }
}
