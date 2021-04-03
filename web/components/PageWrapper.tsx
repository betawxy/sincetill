import Link from "next/link";
import React from "react";

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
            <div className="beta-btn-blue">Add Item</div>
          </Link>
        </div>
      </nav>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
