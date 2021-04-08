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
      <main style={{ minHeight: "calc(100vh - 12.125rem)" }}>
        <div className="container mx-auto max-w-screen-md mt-6">{children}</div>
      </main>
      <footer className="h-16 mt-12 bg-indigo-100 border-t-2 border-indigo-200 border-dashed">
        <div className="flex container max-w-screen-md mx-auto h-16">
          <div className="flex self-center px-3 md:px-0">
            <span className="text-indigo-600 text-sm">
              &copy;{new Date().getFullYear() + " "}
              <Link href="/">
                <span className="text-indigo-600 text-sm cursor-pointer hover:underline">
                  SinceTill.com
                </span>
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </AuthRedirect>
  );
}
