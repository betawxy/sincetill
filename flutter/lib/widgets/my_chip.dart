import 'package:flutter/material.dart';

class MyChip extends StatelessWidget {
  const MyChip({
    Key? key,
    required this.label,
    required this.color,
    this.sizeFactor = 1,
  }) : super(key: key);

  final String label;
  final Color color;
  final double sizeFactor;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(
        label,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 12 * sizeFactor,
          color: color,
        ),
      ),
      padding: EdgeInsets.symmetric(
        horizontal: 5 * sizeFactor,
        vertical: 3 * sizeFactor,
      ),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        borderRadius: BorderRadius.circular(3 * sizeFactor),
      ),
      constraints: BoxConstraints(minWidth: 40 * sizeFactor),
    );
  }
}
