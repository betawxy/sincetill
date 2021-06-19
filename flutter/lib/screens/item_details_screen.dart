import 'package:bordered_text/bordered_text.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:glassmorphism/glassmorphism.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/widgets/appbar_title.dart';
import 'package:sincetill/widgets/my_chip.dart';
import 'package:sincetill/widgets/time_diff_description.dart';

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
          child: ItemBackgroundImage(item: item),
        ),
      ),
    );
  }
}

class ItemBackgroundImage extends StatelessWidget {
  const ItemBackgroundImage({
    Key? key,
    required this.item,
  }) : super(key: key);

  final Item item;

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
        child: ItemDetails(item: item),
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

class ItemDetails extends StatelessWidget {
  const ItemDetails({
    Key? key,
    required this.item,
  }) : super(key: key);

  final Item item;

  @override
  Widget build(BuildContext context) {
    bool isSince = item.ts.compareTo(Timestamp.now()) < 0;

    return FractionallySizedBox(
      widthFactor: 0.816,
      heightFactor: 0.618,
      child: GlassmorphicContainer(
        width: double.infinity,
        height: double.infinity,
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
        child: Container(
          padding: const EdgeInsets.all(10.0),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  MyChip(
                    label: isSince ? 'since' : 'till',
                    color: isSince ? Color(0xFF0FB981) : Color(0xFFED57A1),
                    sizeFactor: 1.86,
                  ),
                  Visibility(
                    child: MyChip(
                      label: 'full day',
                      color: Color(0xFF006d77),
                      sizeFactor: 1.86,
                    ),
                    visible: item.isFullDayEvent,
                  ),
                ],
              ),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    BorderedText(
                      strokeWidth: 2.0,
                      strokeColor: Colors.white,
                      child: Text(
                        item.title,
                        textAlign: TextAlign.center,
                        maxLines: 5,
                        overflow: TextOverflow.ellipsis,
                        style: GoogleFonts.lato().copyWith(
                          color: Theme.of(context).accentColor,
                          fontWeight: FontWeight.w600,
                          fontSize: 40,
                        ),
                      ),
                    ),
                    Flexible(
                      child: FractionallySizedBox(
                        heightFactor: 0.1,
                      ),
                    ),
                    TimeDiffDescription(
                      item: item,
                      style: GoogleFonts.robotoCondensed().copyWith(
                        color: Color(0xFF343a40).withOpacity(.8),
                        fontWeight: FontWeight.w600,
                        fontSize: 20,
                      ),
                    ),
                    Flexible(
                      child: FractionallySizedBox(
                        heightFactor: 0.286,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
