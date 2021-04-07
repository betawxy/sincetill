import { UserContext } from "lib/context";
import { auth } from "lib/firebase";
import Link from "next/link";
import React, { useContext, useState } from "react";
import ProgressBar from "./ProgressBar";

function MenuIcon({ show }) {
  if (show) {
    return (
      <div className="w-6 h-6 flex flex-col pt-1.25">
        <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-1.5 rotate-45"></div>
        <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-1.5 opacity-0"></div>
        <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-1.5 -rotate-45"></div>
      </div>
    );
  }
  return (
    <div className="w-6 h-6 flex flex-col pt-1.25">
      <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-0"></div>
      <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-1.5"></div>
      <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-3"></div>
    </div>
  );
}

export default function Navbar() {
  const { user } = useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <nav className="mb-3">
      <div className="bg-indigo-800 p-3">
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
              <>
                <div className="flex">
                  <div>
                    <Link href="/items/add">
                      <div className="beta-link-light">Add Item</div>
                    </Link>
                  </div>
                  <div
                    className="bg-indigo-600 rounded cursor-pointer ml-3"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <MenuIcon show={showDropdown} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {showDropdown && (
        <div className="container mx-auto max-w-screen-md flex flex-col items-end bg-indigo-200">
          <div className="">{user.displayName}</div>
          <button className=" " onClick={signOut}>
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
