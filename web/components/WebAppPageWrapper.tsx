import React from "react";

import { UserContext } from "lib/context";
import { useUserData } from "lib/hooks";

import Navbar from "components/Navbar";
import AuthRedirect from "components/AuthRedirect";
import Link from "next/link";

export default function PageWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <AuthRedirect>
        <Navbar />
        <main>
          <div className="container mx-auto max-w-screen-md">{children}</div>
        </main>
        <footer>
          <Link href="/">
            <div className="beta-link h-4 bg-blue-100">///</div>
          </Link>
        </footer>
      </AuthRedirect>
    </UserContext.Provider>
  );
}
