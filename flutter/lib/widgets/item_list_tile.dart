import 'package:cached_network_image/cached_network_image.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sincetill/models/item_model.dart';
import 'package:sincetill/widgets/time_diff_description.dart';

import 'my_chip.dart';

const DEFAULT_IMAGE =
    "https://firebasestorage.googleapis.com/v0/b/sincetill-app.appspot.com/o/images%2F015ee67c-1997-4340-8c14-ece8078661c7.png?alt=media&token=d671b65b-e619-485e-a1c0-720d00f24e4b";

class ItemListTile extends StatelessWidget {
  const ItemListTile({
    Key? key,
    required this.item,
  }) : super(key: key);

  final Item item;

  @override
  Widget build(BuildContext context) {
    bool isSince = item.ts.compareTo(Timestamp.now()) < 0;
    var imageUrl =
        item.backgroundImage.isEmpty ? DEFAULT_IMAGE : item.backgroundImage;
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 4.0),
          child: ListTile(
            leading: Container(
              width: 60,
              height: 60,
              child: ClipRRect(
                borderRadius: BorderRadius.circular(5),
                child: CachedNetworkImage(
                  imageUrl: imageUrl,
                  placeholder: (context, url) => CircularProgressIndicator(),
                  errorWidget: (context, url, error) => Icon(Icons.error),
                  fit: BoxFit.cover,
                ),
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
                        width: 8,
                      ),
                      Expanded(
                        child: Text(
                          item.title,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: GoogleFonts.lato().copyWith(
                            color: Colors.black.withOpacity(0.7),
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                Visibility(
                  child: MyChip(
                    label: 'full day',
                    color: Color(0xFF006d77),
                  ),
                  visible: item.isFullDayEvent,
                )
              ],
            ),
            subtitle: TimeDiffDescription(item: item),
          ),
        ),
        Divider(
          height: 1,
        ),
      ],
    );
  }
}
