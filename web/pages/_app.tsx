import "styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";

import { UserContext } from "lib/context";
import { useUserData } from "lib/hooks";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn:
    "https://18c73c3d59724bd0a95b8943caea11bc@o566359.ingest.sentry.io/5709115",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContext.Provider value={useUserData()}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
