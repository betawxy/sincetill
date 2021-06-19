import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';

enum EFormatType {
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
  final EFormatType formatType;
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
          formatType: EFormatType.values[data['formatType']!],
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
      'ts': ts.millisecondsSinceEpoch,
      'ctime': ctime.millisecondsSinceEpoch,
      'mtime': mtime.millisecondsSinceEpoch,
    };
  }

  static final _tuples = [
    [EFormatType.YEARS, 3600 * 24 * 365, "year"],
    [EFormatType.MONTHS, 3600 * 24 * 30, "month"],
    [EFormatType.WEEKS, 3600 * 24 * 7, "week"],
    [EFormatType.DAYS, 3600 * 24, "day"],
    [EFormatType.HOURS, 3600, "h"],
    [EFormatType.MINUTES, 60, "m"],
    [EFormatType.SECONDS, 1, "s"],
  ];

  String getDateTimeString() {
    var diff =
        this.ts.millisecondsSinceEpoch - Timestamp.now().millisecondsSinceEpoch;
    diff = (diff ~/ 1000).abs();

    List<String> arr = [];
    var started = false;

    for (var i = 0; i < _tuples.length; i++) {
      EFormatType t = _tuples[i][0] as EFormatType;
      var mod = _tuples[i][1] as int;
      var s = _tuples[i][2] as String;

      if (t == this.formatType) {
        started = true;
      }

      if (this.isFullDayEvent &&
          t == EFormatType.HOURS &&
          this.formatType != EFormatType.HOURS &&
          this.formatType != EFormatType.MINUTES &&
          this.formatType != EFormatType.SECONDS) {
        started = false;
      }

      if (started) {
        var v = (diff / mod).floor();
        if (s.length == 1) {
          arr.add(v.toString() + s);
        } else if (v > 1) {
          arr.add(v.toString() + " " + s + "s");
        } else if (v == 1) {
          arr.add(v.toString() + " " + s);
        }

        diff %= mod;
      }
    }

    if (arr.length > 1) {
      String last = arr.last;
      arr.removeLast();
      String last2 = arr.last;
      arr.removeLast();
      arr.add(last2.toString() + " and " + last);
    }

    if (arr.length == 0) {
      if (this.isFullDayEvent) {
        arr.add("today is the day!");
      } else {
        arr.add("right now!");
      }
    }

    return arr.join(", ");
  }
}
