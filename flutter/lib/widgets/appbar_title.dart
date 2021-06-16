import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppBarTitle extends StatelessWidget {
  const AppBarTitle({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      'SinceTill',
      textAlign: TextAlign.center,
      style: GoogleFonts.courgette().copyWith(
        fontWeight: FontWeight.bold,
      ),
    );
  }
}
