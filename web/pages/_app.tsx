import "styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";

import { UserContext } from "lib/context";
import { useUserData } from "lib/hooks";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider value={useUserData()}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
