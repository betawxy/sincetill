import Link from "next/link";
import React from "react";

import NextNprogress from "nextjs-progressbar";

export default function PageWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="container mx-auto">
      <nav className="flex items-center mb-3 bg-indigo-50 p-6 rounded-b">
        <div className="flex-grow">
          <div className="inline-block">
            <Link href="/">
              <h1 className="text-3xl cursor-pointer">since till</h1>
            </Link>
          </div>
        </div>
        <div className="flex-none">
          <Link href="/item/add">
            <div className="beta-link">Add Item</div>
          </Link>
        </div>
      </nav>
      <main>{children}</main>
      <footer></footer>
      <NextNprogress
        color="#00afb9"
        startPosition={0}
        stopDelayMs={50}
        height={2}
      />
    </div>
  );
}
