import 'dart:async';

import 'package:bordered_text/bordered_text.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sincetill/models/item_model.dart';

class TimeDiffDescription extends StatefulWidget {
  const TimeDiffDescription({
    Key? key,
    required this.item,
    this.style,
  }) : super(key: key);

  final Item item;
  final TextStyle? style;

  @override
  _TimeDiffDescriptionState createState() => _TimeDiffDescriptionState();
}

class _TimeDiffDescriptionState extends State<TimeDiffDescription> {
  late Timer timer;

  @override
  void initState() {
    super.initState();
    timer = new Timer.periodic(
      Duration(milliseconds: 300),
      (Timer t) => setState(() {}),
    );
  }

  @override
  void dispose() {
    super.dispose();
    timer.cancel();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 8.0),
      child: Stack(
        alignment: Alignment.centerLeft,
        children: [
          BorderedText(
            strokeWidth: 1.0,
            strokeColor: Colors.white,
            child: Text(
              widget.item.getDateTimeString(),
              style: widget.style ??
                  GoogleFonts.robotoCondensed().copyWith(fontSize: 12.86),
            ),
          )
        ],
      ),
    );
  }
}
