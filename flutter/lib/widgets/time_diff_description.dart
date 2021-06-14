import 'dart:async';

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:sincetill/models/item_model.dart';

class TimeDiffDescription extends StatefulWidget {
  const TimeDiffDescription({
    Key? key,
    required this.item,
  }) : super(key: key);

  final Item item;

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
      child: Text(
        widget.item.getDateTimeString(),
        style: GoogleFonts.robotoCondensed().copyWith(fontSize: 12.86),
      ),
    );
  }
}
