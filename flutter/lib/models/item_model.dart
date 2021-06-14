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
  final Timestamp ctime;
  final Timestamp mtime;

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

  Item.fromJson(Map<String, dynamic> data)
      : this(
          id: data['id']!,
          uid: data['uid']!,
          title: data['title']!,
          isFullDayEvent: data['isFullDayEvent']! as bool,
          formatType: FormatType.values[data['formatType']!],
          backgroundImage: data['backgroundImage']!,
          ts: Timestamp.fromMillisecondsSinceEpoch(data['ts']!),
          ctime: Timestamp.fromMillisecondsSinceEpoch(data['ctime']!),
          mtime: Timestamp.fromMillisecondsSinceEpoch(data['mtime']!),
        );

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'uid': uid,
      'title': title,
      'isFullDayEvent': isFullDayEvent,
      'formatType': formatType.index,
      'backgroundImage': backgroundImage,
      'ts': ts,
      'ctime': ctime,
      'mtime': mtime,
    };
  }
}
