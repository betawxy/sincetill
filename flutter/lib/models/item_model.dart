import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';

enum FormatType {
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
}

@immutable
class Item {
  final String id;
  final String uid;
  final String title;
  final Timestamp ts;
  final bool isFullDayEvent;
  final FormatType formatType;
  final String backgroundImage;
  final int ctime;
  final int mtime;

  const Item({
    required this.id,
    required this.uid,
    required this.title,
    required this.isFullDayEvent,
    required this.formatType,
    required this.backgroundImage,
    required this.ts,
    required this.ctime,
    required this.mtime,
  });
}
