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
      <footer className="h-16 mt-20 bg-indigo-100 border-t-2 border-indigo-200 border-dashed">
        <div className="flex container max-w-screen-md mx-auto h-16">
          <div className="flex self-center">
            <span className="text-indigo-600 text-sm">
              &copy;{new Date().getFullYear() + " "}
              <Link href="/">SinceTill.com</Link>
            </span>
          </div>
        </div>
      </footer>
    </AuthRedirect>
  );
}
