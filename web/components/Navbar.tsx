import { UserContext } from "lib/context";
import { auth } from "lib/firebase";
import Link from "next/link";
import React, { useContext } from "react";
import ProgressBar from "./ProgressBar";

export default function Navbar() {
  const { user } = useContext(UserContext);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="mb-3 bg-indigo-800 p-3">
      <div className="container mx-auto max-w-screen-md flex items-center">
        <ProgressBar />
        <div className="flex-grow">
          <Link href="/items">
            <span className="text-white text-2xl cursor-pointer overflow-hidden rounded">
              <span className="h-10 text-pink-200">since</span>
              <span className="h-10 text-green-200">till</span>
            </span>
          </Link>
        </div>
        <div className="flex-none">
          {!!user && (
            <div className="flex">
              <Link href="/items/add">
                <div className="beta-link-light">Add Item</div>
              </Link>
              <button className="beta-btn-red" onClick={signOut}>
                Sign Out
              </button>
              <div className="text-white">{user.displayName}</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
