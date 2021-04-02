import { FormatType, TItem } from "./types";

export const defaultBackground = "";

export const defaultNewItem: TItem = {
  title: "",
  ts: Date.now(),
  isFullDateEvent: false,
  formatType: FormatType.DAYS,
  backgroundImage: defaultBackground,
};
