import 'package:flutter/material.dart';
import 'package:glassmorphism/glassmorphism.dart';
import 'package:sincetill/models/item_model.dart';

import 'item_details_card_content.dart';

class ItemDetailsCard extends StatelessWidget {
  const ItemDetailsCard({
    Key? key,
    required this.item,
  }) : super(key: key);

  final Item item;

  @override
  Widget build(BuildContext context) {
    return FractionallySizedBox(
      widthFactor: 0.816,
      heightFactor: 0.8,
      alignment: Alignment.topCenter,
      child: GlassmorphicContainer(
        width: double.infinity,
        height: double.infinity,
        margin: EdgeInsets.only(
          top: MediaQuery.of(context).size.height * .1,
        ),
        borderRadius: 20,
        blur: 8,
        alignment: Alignment.bottomCenter,
        border: 2,
        linearGradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFFffffff).withOpacity(0.1),
            Color(0xFFFFFFFF).withOpacity(0.05),
          ],
          stops: [
            0.1,
            1,
          ],
        ),
        borderGradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFFffffff).withOpacity(0.5),
            Color((0xFFFFFFFF)).withOpacity(0.5),
          ],
        ),
        child: ItemDetailsCardContent(item: item),
      ),
    );
  }
}
