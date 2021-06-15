import 'package:flutter/material.dart';

class MyChip extends StatelessWidget {
  const MyChip({
    Key? key,
    required this.label,
    required this.color,
  }) : super(key: key);

  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text(
        label,
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 12,
          color: color,
        ),
      ),
      padding: EdgeInsets.symmetric(horizontal: 5, vertical: 3),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        borderRadius: BorderRadius.circular(3),
      ),
      constraints: BoxConstraints(minWidth: 40),
    );
  }
}
