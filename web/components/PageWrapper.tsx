import Link from "next/link";
import React from "react";

export default function ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="container mx-auto">
      <nav className="text-3xl">
        <Link href="/">
          <h1 className="bg-green-50 p-6 cursor-pointer rounded-b">
            since till
          </h1>
        </Link>
      </nav>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
