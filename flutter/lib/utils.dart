import 'dart:math' show Random;

String genUniqueId({int len = 6}) {
  var r = Random();

  var res = "";
  for (var i = 0; i < len; i++) {
    var v = r.nextInt(62);
    if (v < 26) {
      res += String.fromCharCode('a'.codeUnitAt(0) + v);
    } else if (v < 52) {
      res += String.fromCharCode("A".codeUnitAt(0) + v - 26);
    } else {
      res += String.fromCharCode("0".codeUnitAt(0) + v - 52);
    }
  }

  return res;
}
