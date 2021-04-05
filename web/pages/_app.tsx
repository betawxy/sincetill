import "antd/dist/antd.css";
import "styles/globals.css";

import type { AppProps /*, AppContext */ } from "next/app";
import React from "react";
import PageWrapper from "components/PageWrapper";
import { UserContext } from "lib/context";
import { useUserData } from "lib/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </UserContext.Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp;
