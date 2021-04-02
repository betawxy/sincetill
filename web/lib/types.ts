export enum EFormatType {
  SECONDS,
  MINUTES,
  HOURS,
  DAYS,
  WEEKS,
  MONTHS,
  YEARS,
}

export type TItem = {
  id: string;
  uid: string;
  title: string;
  ts: number;
  isFullDayEvent: boolean;
  formatType: EFormatType;
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
