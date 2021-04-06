import { UserContext } from "lib/context";
import { auth } from "lib/firebase";
import Link from "next/link";
import React, { useContext, useState } from "react";
import ProgressBar from "./ProgressBar";
import SignInDialog from "./SignInDialog";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  const signOut = () => {
    auth.signOut();
  };

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
          {!!user ? (
            <div className="flex">
              <Link href="/items/add">
                <div className="beta-link-light">Add Item</div>
              </Link>
              <button className="beta-btn-red" onClick={signOut}>
                Sign Out
              </button>
              <div className="text-white">{user.displayName}</div>
            </div>
          ) : (
            <>
              <button
                className="beta-btn-red"
                onClick={() => {
                  setShowSignInDialog(true);
                  document.body.classList.add("overflow-hidden");
                }}
              >
                Sign In
              </button>
              {showSignInDialog && (
                <SignInDialog
                  close={() => {
                    setShowSignInDialog(false);
                    document.body.classList.remove("overflow-hidden");
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
