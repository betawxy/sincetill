import { EFormatType, TItem } from "./types";

export const defaultBackground = "";

export const defaultNewItem: TItem = {
  title: "",
  ts: Date.now(),
  isFullDayEvent: false,
  formatType: EFormatType.DAYS,
  backgroundImage: defaultBackground,
  uid: "",
};
