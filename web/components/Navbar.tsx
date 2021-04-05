import Link from "next/link";
import React from "react";
import ProgressBar from "./ProgressBar";

export default function Navbar() {
  return (
    <nav className="mb-3 bg-indigo-500 p-4">
      <div className="container mx-auto max-w-screen-md flex items-center">
        <ProgressBar />
        <div className="flex-grow">
          <div className="inline-block">
            <Link href="/">
              <h1 className="text-white text-3xl cursor-pointer">since till</h1>
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
  );
}
