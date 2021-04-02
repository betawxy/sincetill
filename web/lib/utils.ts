export function genUniqueId(len: number = 6): string {
  let res = "";
  for (let i = 0; i < len; i++) {
    const v = Math.floor(Math.random() * 62);
    if (v < 26) {
      res += String.fromCharCode("a".charCodeAt(0) + v);
    } else if (v < 52) {
      res += String.fromCharCode("A".charCodeAt(0) + v - 26);
    } else {
      res += String.fromCharCode("0".charCodeAt(0) + v - 52);
    }
  }

  return res;
}
