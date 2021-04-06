import React from "react";

import Navbar from "components/Navbar";
import AuthRedirect from "components/AuthRedirect";
import Link from "next/link";

export default function WebAppPageWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <AuthRedirect>
      <Navbar />
      <main>
        <div className="container mx-auto max-w-screen-md">{children}</div>
      </main>
      <footer>
        <Link href="/">
          <div className="beta-link h-10 bg-blue-100"></div>
        </Link>
      </footer>
    </AuthRedirect>
  );
}
