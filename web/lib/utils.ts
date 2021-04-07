import moment from "moment";
import { DEFAULT_IMAGE } from "./consts";
import { User } from "./firebase";
import { EFormatType, TItem, TUser } from "./types";

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

export function genNewItem(): TItem {
  return {
    id: genUniqueId(),
    uid: "",
    title: "",
    ts: Date.now(),
    isFullDayEvent: true,
    formatType: EFormatType.DAYS,
    backgroundImage: "",
    ctime: Date.now(),
    mtime: Date.now(),
  };
}

const tuples: [EFormatType, number, string][] = [
  [EFormatType.YEARS, 3600 * 24 * 365, "year"],
  [EFormatType.MONTHS, 3600 * 24 * 30, "month"],
  [EFormatType.WEEKS, 3600 * 24 * 7, "week"],
  [EFormatType.DAYS, 3600 * 24, "day"],
  [EFormatType.HOURS, 3600, "hour"],
  [EFormatType.MINUTES, 60, "minute"],
  [EFormatType.SECONDS, 1, "second"],
];

export function getDateTimeString(item: TItem): string {
  const m = moment(item.ts);
  const mnow = moment();
  let diff = Math.round(Math.abs(m.diff(mnow)) / 1000);

  let arr = [];
  let started = false;
  for (const [t, mod, s] of tuples) {
    if (t === item.formatType) {
      started = true;
    }

    if (item.isFullDayEvent && t === EFormatType.HOURS) {
      started = false;
    }

    if (started) {
      const v = Math.floor(diff / mod);
      if (v > 1) {
        arr.push(v + " " + s + "s");
      } else if (v == 1) {
        arr.push(v + " " + s);
      }

      diff %= mod;
    }
  }

  if (arr.length > 1) {
    const last = arr.pop();
    arr.push(arr.pop() + " and " + last);
  }

  if (arr.length === 0) {
    if (item.isFullDayEvent) {
      arr.push("today is the day!");
    } else {
      arr.push("right now!");
    }
  }

  return arr.join(", ");
}

export function createTUserFromUser(user: User): TUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    settings: { defaultBackground: DEFAULT_IMAGE },
  };
}

export function getFirstItem(): TItem {
  return {
    id: genUniqueId(),
    uid: "",
    title: "Started using SinceTill",
    ts: Date.now(),
    isFullDayEvent: false,
    formatType: EFormatType.DAYS,
    backgroundImage: "",
    ctime: Date.now(),
    mtime: Date.now(),
  };
}
