import { UserContext } from "lib/context";
import { auth } from "lib/firebase";
import Link from "next/link";
import React, { useContext, useState } from "react";
import ProgressBar from "./ProgressBar";

function HamburgerIcon({ show }) {
  if (show) {
    return (
      <div className="w-6 h-6 flex flex-col pt-1.5">
        <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-1.5 rotate-45"></div>
        <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-1.5 opacity-0"></div>
        <div className="absolute h-0.5 w-4 bg-white transform transition duration-200 ease-in-out translate-x-1 translate-y-1.5 -rotate-45"></div>
      </div>
    );
  }
  return (
    <div className="w-6 h-6 flex flex-col pt-1.5">
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
    <nav>
      <div className="h-14 bg-indigo-800 p-3">
        <div className="container mx-auto max-w-screen-md flex items-center">
          <ProgressBar />
          <div className="flex-grow">
            <Link href="/items">
              <span className="text-2xl font-extrabold cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-green-300">
                sincetill
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
                    <HamburgerIcon show={showDropdown} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {!!user && showDropdown && (
        <div className="container mx-auto max-w-screen-md bg-indigo-50 select-none">
          <div className="border-b-2 border-gray-300 w-full border-dashed text-right text-indigo-600 p-3">
            {user.displayName}
          </div>
          <div className="w-full text-right">
            <div
              className="inline-block text-pink-500 p-3 underline cursor-pointer"
              onClick={signOut}
            >
              Sign Out
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
