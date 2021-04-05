import { createContext } from "react";
import { TUserContext } from "./types";

const data: TUserContext = {
  user: null,
  userData: null,
};

export const UserContext = createContext(data);
