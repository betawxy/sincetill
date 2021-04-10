import { User } from "./firebase";

export enum EFormatType {
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
}

export enum ESortType {
  TITLE,
  TIME,
  CTIME,
  MTIME,
}

export enum ESortDirection {
  ASC,
  DESC,
}

export type TItem = {
  id: string;
  uid: string;
  title: string;
  ts: number;
  isFullDayEvent: boolean;
  formatType: EFormatType;
  backgroundImage: string;
  ctime: number;
  mtime: number;
};

export type TSettings = {
  defaultBackground: string;
  sortType: ESortType;
  sortDirection: ESortDirection;
};

export type TUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  settings: TSettings;
};

export type TUserContext = {
  user: User | null;
  userData: TUser | null;
};
