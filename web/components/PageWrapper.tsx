import Link from "next/link";
import React from "react";

import NextNprogress from "nextjs-progressbar";

export default function PageWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div>
      <nav className="mb-3 bg-indigo-500 p-4">
        <div className="container mx-auto max-w-screen-md flex items-center">
          <NextNprogress
            color="#a8dadc"
            startPosition={0}
            stopDelayMs={50}
            height={2}
          />
          <div className="flex-grow">
            <div className="inline-block">
              <Link href="/">
                <h1 className="text-white text-3xl cursor-pointer">
                  since till
                </h1>
              </Link>
            </div>
          </div>
          <div className="flex-none">
            <Link href="/item/add">
              <div className="beta-link-light">Add Item</div>
            </Link>
          </div>
        </div>
      </nav>
      <div className="container mx-auto max-w-screen-md">
        <main>{children}</main>
        <footer></footer>
      </div>
    </div>
  );
}
