export enum FormatType {
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
}

export type TItem = {
  title: string;
  ts: number;
  isFullDateEvent: boolean;
  formatType: FormatType;
  backgroundImage: string;
};

export type TSettings = {
  defaultBackground: string;
};

export type TUser = {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;

  settings: TSettings;
  items: TItem[];
};
